import { Broker } from "@prisma/client";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import { ValidationError } from "@ubento/service-toolkit";
import { User as WorkOSUser } from "@workos-inc/node";
import prisma from "../../lib/prisma.js";
import { workos } from "../../lib/workos.js";
import { listTeamMembers, listUserTeams } from "./team/memberships.js";
import {
  createTeam,
  deleteTeam,
  getTeamByHandle,
  teamRoles,
} from "./team/team.js";

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

  const teams = await listUserTeams(user.id);
  const canBeDeleted = await Promise.all(
    teams.map(async (team) => {
      const members = await listTeamMembers(team.id);
      return members.length === 1 && members[0].id === user.id;
    }),
  );

  if (canBeDeleted.some((c) => !c)) {
    throw new ValidationError(
      "User is a member of some teams that can't be deleted",
    );
  }

  // Delete all teams
  await Promise.all(
    teams.map(async (team) => {
      await deleteTeam(team.id);
    }),
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

  const teams = await listUserTeams(syncedUser.id);
  if (teams.length === 0) {
    let baseHandle = (syncedUser.name || syncedUser.email || syncedUser.id)
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .toLowerCase();
    let handle = baseHandle;
    let suffix = 0;

    while (true) {
      const existingTeam = await getTeamByHandle(handle);
      if (!existingTeam) {
        break;
      }
      suffix++;
      handle = `${baseHandle}-${suffix}`;
    }

    await createTeam({
      name: `${syncedUser.name}'s Team`,
      handle,
      members: [
        {
          user_id: syncedUser.id,
          role: teamRoles.owner,
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

export async function addUserRoles(userId: string, roles: string[]) {
  const user = await getUser(userId);
  if (!user) {
    throw new ValidationError("User not found");
  }

  const currentRoles = new Set(user.roles);
  for (const role of roles) {
    currentRoles.add(role);
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      roles: Array.from(currentRoles),
    },
  });
}

export async function removeUserRoles(userId: string, roles: string[]) {
  const user = await getUser(userId);
  if (!user) {
    throw new ValidationError("User not found");
  }

  const currentRoles = new Set(user.roles);
  for (const role of roles) {
    currentRoles.delete(role);
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      roles: Array.from(currentRoles),
    },
  });
}
