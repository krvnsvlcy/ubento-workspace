import { Broker, Prisma, Team } from "@ubento/database/iam";
import {
  generateBareId,
  makeEntityId,
  ubentoAuth,
  ubentoEntities,
} from "@ubento/primitives";
import {
  ValidationError,
  isPrismaNotFoundError,
  prismaListWithCursor,
} from "@ubento/service-toolkit";
import { Organization as WOOrganization } from "@workos-inc/node";
import { authorizer } from "../../../lib/authorizer.js";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";

export const teamScopeKind = "team";
export function workosRoleFromInternalRole(role: string) {
  switch (role) {
    case ubentoAuth.roles.team.owner:
      return "admin";
    case ubentoAuth.roles.team.admin:
      return "admin";
    case ubentoAuth.roles.team.member:
      return "member";
    default:
      throw new ValidationError("Invalid role");
  }
}
export function isValidTeamHandle(handle: string) {
  return (
    handle.match(/^[a-z0-9\-]+$/) && handle.length >= 3 && handle.length <= 64
  );
}

export async function listTeams({
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

  return prismaListWithCursor(prisma.team, {
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
export async function createTeam({
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
  if (!members.some((m) => m.role === ubentoAuth.roles.team.owner)) {
    throw new ValidationError("At least one member must have owner role");
  }
  // validate handle
  if (!isValidTeamHandle(handle)) {
    throw new ValidationError("Invalid team handle");
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

  const teamId = makeEntityId({
    code: ubentoEntities.team.code,
    bareId: generateBareId(),
  });

  let workosOrg: WOOrganization | null = null;
  let team: Team | null = null;

  try {
    workosOrg = await workos.organizations.createOrganization({ name });
    const workOsOrgId = workosOrg.id;

    const createdTeam = await prisma.team.create({
      data: {
        id: teamId,
        name,
        handle,
        broker: Broker.WORKOS,
        broker_id: workosOrg.id,
      },
    });
    team = createdTeam;

    await Promise.all(
      members.map(async (m) => {
        const user = memberUsersById[m.user_id];
        if (!user) {
          throw new Error("User not found");
        }
        await prisma.teamMembership.create({
          data: {
            id: makeEntityId({
              code: ubentoEntities.teamMembership.code,
              bareId: generateBareId(),
            }),
            team_id: createdTeam.id,
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

        // SYNC AUTHORIZER
        await authorizer.assignRole(
          user.id,
          m.role,
          ubentoAuth.scopes.team({ team_id: createdTeam.id }),
        );
      }),
    );
  } catch (e) {
    if (team) {
      await prisma.team.delete({
        where: {
          id: team.id,
        },
      });
    }
    if (workosOrg) {
      await workos.organizations.deleteOrganization(workosOrg.id);
    }
    throw e;
  }

  return team;
}
export async function getTeam(id: string, includeSoftDeleted = false) {
  return await prisma.team.findUnique({
    where: {
      id,
      ...(includeSoftDeleted ? undefined : { deleted_at: { isSet: false } }),
    },
  });
}
export async function getTeamByHandle(
  handle: string,
  includeSoftDeleted = false,
) {
  return await prisma.team.findUnique({
    where: {
      handle,
      ...(includeSoftDeleted ? undefined : { deleted_at: { isSet: false } }),
    },
  });
}
export async function updateTeam(
  id: string,
  update: {
    name?: string;
    handle?: string;
    picture?: string;
  },
) {
  if (update.handle) {
    if (!isValidTeamHandle(update.handle)) {
      throw new ValidationError("Invalid team handle");
    }
  }

  const team = await prisma.team.update({
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
  return team;
}
export async function deleteTeam(id: string) {
  try {
    const team = await prisma.team.findUnique({ where: { id } });
    if (!team) return;

    // Find all memberships to revoke in Casbin
    const memberships = await prisma.teamMembership.findMany({
      where: { team_id: id },
    });

    const updatedTeam = await prisma.team.update({
      where: {
        id,
        deleted_at: { isSet: false }, // can't delete soft deleted
      },
      data: {
        handle: `!!deleted-${id}`, // free up handle
        deleted_at: new Date(),
      },
    });

    // Revoke all memberships in Prisma
    await prisma.teamMembership.deleteMany({
      where: {
        team_id: updatedTeam.id,
      },
    });

    // SYNC AUTHORIZER: Revoke all roles in Casbin for this team
    await Promise.all(
      memberships.map((m) =>
        authorizer.revokeRole(
          m.user_id,
          m.role,
          ubentoAuth.scopes.team({ team_id: id }),
        ),
      ),
    );

    // delete workos organization
    await workos.organizations.deleteOrganization(updatedTeam.broker_id);
  } catch (e) {
    if (isPrismaNotFoundError(Prisma, e)) {
      return;
    }
    throw e;
  }
}
