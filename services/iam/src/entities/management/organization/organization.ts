import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import {
  ValidationError,
  isPrismaNotFoundError,
  prismaListWithCursor,
} from "@ubento/service-toolkit";
import { Broker, Organization, Prisma } from "@prisma/client";
import { Organization as WOOrganization } from "@workos-inc/node";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";

export const organizationScopeKind = "organization";
export const organizationRoles = {
  owner: "organization:owner",
  admin: "organization:admin",
  member: "organization:member",
};
export function workosRoleFromInternalRole(role: string) {
  switch (role) {
    case organizationRoles.owner:
      return "admin";
    case organizationRoles.admin:
      return "admin";
    case organizationRoles.member:
      return "member";
    default:
      throw new ValidationError("Invalid role");
  }
}
export function isValidOrganizationHandle(handle: string) {
  return (
    handle.match(/^[a-z0-9\-]+$/) && handle.length >= 3 && handle.length <= 64
  );
}

export async function listOrganizations({
  ids,
  handle,
  name,
  limit,
  cursor,
  sort,
  includeSoftDeleted,
}: {
  ids?: string[];
  handle?: string;
  name?: string;
  limit?: number;
  cursor?: string;
  sort?: "newest" | "recent" | "name";
  includeSoftDeleted?: boolean;
}) {
  const orderBy =
    sort === "recent"
      ? [{ updated_at: "desc" }, { id: "desc" }]
      : sort === "name"
        ? [{ name: "asc" }, { id: "asc" }]
        : /* default newest */ [{ created_at: "desc" }, { id: "desc" }];

  return prismaListWithCursor(prisma.organization, {
    limit,
    cursor,
    orderBy,
    where: {
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      ...(handle && { handle: { contains: handle, mode: "insensitive" } }),
      ...(ids && { id: { in: ids } }),
      ...(includeSoftDeleted ? undefined : { deleted_at: { isSet: false } }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });
}
export async function createOrganization({
  handle,
  name,
  members,
}: {
  handle: string;
  name: string;
  members: {
    user_id: string;
    role: string;
  }[];
}) {
  // at least one member with owner role
  if (!members.some((m) => m.role === organizationRoles.owner)) {
    throw new ValidationError("At least one member must have owner role");
  }
  // validate handle
  if (!isValidOrganizationHandle(handle)) {
    throw new ValidationError("Invalid organization handle");
  }
  // member ids are unique
  const memberUserIds = new Set(members.map((m) => m.user_id));
  if (memberUserIds.size !== members.length) {
    throw new ValidationError("Duplicate user ids");
  }
  // ensure members exist
  const memberUsers = await prisma.user.findMany({
    where: {
      id: { in: Array.from(memberUserIds) },
    },
  });
  if (memberUsers.length !== members.length) {
    throw new ValidationError("Some members do not exist");
  }
  const memberUsersById = Object.fromEntries(memberUsers.map((u) => [u.id, u]));

  const organizationId = makeEntityId({
    code: ubentoEntities.organization.code,
    bareId: generateBareId(),
  });

  let workosOrg: WOOrganization | null = null;
  let org: Organization | null = null;

  try {
    workosOrg = await workos.organizations.createOrganization({ name });
    const workOsOrgId = workosOrg.id;

    const createdOrg = await prisma.organization.create({
      data: {
        id: organizationId,
        name,
        handle,
        broker: Broker.WORKOS,
        broker_id: workosOrg.id,
      },
    });
    org = createdOrg;

    await Promise.all(
      members.map(async (m) => {
        const user = memberUsersById[m.user_id];
        if (!user) {
          throw new Error("User not found");
        }
        await prisma.organizationMembership.create({
          data: {
            id: makeEntityId({
              code: ubentoEntities.organizationMembership.code,
              bareId: generateBareId(),
            }),
            organization_id: createdOrg.id,
            user_id: user.id,
            role: m.role,
          },
        });
        if (user.broker === Broker.WORKOS) {
          await workos.userManagement.createOrganizationMembership({
            organizationId: workOsOrgId,
            userId: user.broker_id,
            roleSlug: workosRoleFromInternalRole(m.role),
          });
        }
      }),
    );
  } catch (e) {
    if (org) {
      await prisma.organization.delete({
        where: {
          id: org.id,
        },
      });
    }
    if (workosOrg) {
      await workos.organizations.deleteOrganization(workosOrg.id);
    }
    throw e;
  }

  return org;
}
export async function getOrganization(id: string, includeSoftDeleted = false) {
  return await prisma.organization.findUnique({
    where: {
      id,
      ...(includeSoftDeleted ? undefined : { deleted_at: { isSet: false } }),
    },
  });
}
export async function getOrganizationByHandle(
  handle: string,
  includeSoftDeleted = false,
) {
  return await prisma.organization.findUnique({
    where: {
      handle,
      ...(includeSoftDeleted ? undefined : { deleted_at: { isSet: false } }),
    },
  });
}
export async function updateOrganization(
  id: string,
  update: {
    name?: string;
    handle?: string;
    picture?: string;
  },
) {
  if (update.handle) {
    if (!isValidOrganizationHandle(update.handle)) {
      throw new ValidationError("Invalid organization handle");
    }
  }

  const organization = await prisma.organization.update({
    where: {
      id,
      deleted_at: { isSet: false }, // can't update soft deleted
    },
    data: {
      name: update.name,
      handle: update.handle,
      picture: update.picture,
    },
  });
  return organization;
}
export async function deleteOrganization(id: string) {
  try {
    const updatedOrg = await prisma.organization.update({
      where: {
        id,
        deleted_at: { isSet: false }, // can't delete soft deleted
      },
      data: {
        handle: `!!deleted-${id}`, // free up handle
        deleted_at: new Date(),
      },
    });
    // revoke all memberships
    await prisma.organizationMembership.deleteMany({
      where: {
        organization_id: updatedOrg.id,
      },
    });
    // delete workos organization
    await workos.organizations.deleteOrganization(updatedOrg.broker_id);
  } catch (e) {
    if (isPrismaNotFoundError(Prisma, e)) {
      return;
    }
    throw e;
  }
}
