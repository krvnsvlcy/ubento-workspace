import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import { ValidationError } from "@ubento/service-toolkit";
import { Broker } from "@prisma/client";
import { User as WorkOSUser } from "@workos-inc/node";
import prisma from "../../lib/prisma.js";
import { workos } from "../../lib/workos.js";
import {
  listOrganizationMembers,
  listUserOrganizations,
} from "./organization/memberships.js";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationByHandle,
  organizationRoles,
} from "./organization/organization.js";

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function listUsers({
  limit,
  cursor,
  email,
}: {
  limit?: number;
  cursor?: string;
  email?: string;
}) {
  return await prisma.user.findMany({
    take: limit || 50,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      email: email ? { contains: email, mode: "insensitive" } : undefined,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return;
  }

  const organizations = await listUserOrganizations(user.id);
  const canBeDeleted = await Promise.all(
    organizations.map(async (org) => {
      const members = await listOrganizationMembers(org.id);
      return members.length === 1 && members[0].id === user.id;
    })
  );

  if (canBeDeleted.some((c) => !c)) {
    throw new ValidationError(
      "User is a member of some organizations that can't be deleted"
    );
  }

  // Delete all organizations
  await Promise.all(
    organizations.map(async (org) => {
      await deleteOrganization(org.id);
    })
  );

  // Delete sessions
  await prisma.session.deleteMany({ where: { user_id: id } });

  // Delete user
  await prisma.user.delete({ where: { id } });
}

export async function syncUserData(user: WorkOSUser) {
  const broker = Broker.WORKOS;
  const brokerId = user.id;

  const newId = makeEntityId({
    code: ubentoEntities.user.code,
    bareId: generateBareId(),
  });

  // Check if user exists by provider ref
  const existing = await prisma.user.findUnique({
    where: {
      broker_broker_id: {
        broker,
        broker_id: brokerId,
      },
    },
  });

  const data = {
    email: user.email,
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
    picture: user.profilePictureUrl,
    email_verified: user.emailVerified,
  };

  let syncedUser;

  if (existing) {
    syncedUser = await prisma.user.update({
      where: { id: existing.id },
      data,
    });
  } else {
    // Check if we can find by email to link?
    // Usually better to trust provider_id.
    // Ensure we create with new ID.
    syncedUser = await prisma.user.create({
      data: {
        id: newId,
        broker,
        broker_id: brokerId,
        ...data,
      },
    });
  }

  const organizations = await listUserOrganizations(syncedUser.id);
  if (organizations.length === 0) {
    let baseHandle = (syncedUser.name || syncedUser.email || syncedUser.id)
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .toLowerCase();
    let handle = baseHandle;
    let suffix = 0;

    while (true) {
      const existingOrg = await getOrganizationByHandle(handle);
      if (!existingOrg) {
        break;
      }
      suffix++;
      handle = `${baseHandle}-${suffix}`;
    }

    await createOrganization({
      name: `${syncedUser.name}'s Organization`,
      handle,
      members: [
        {
          user_id: syncedUser.id,
          role: organizationRoles.owner,
        },
      ],
    });
  }

  return syncedUser;
}

export async function syncUser({
  broker,
  brokerId,
}: {
  broker: Broker;
  brokerId: string;
}) {
  if (broker === Broker.WORKOS) {
    const data = await workos.userManagement.getUser(brokerId);
    return syncUserData(data);
  } else {
    throw new ValidationError(`Unsupported broker ${broker}`);
  }
}
