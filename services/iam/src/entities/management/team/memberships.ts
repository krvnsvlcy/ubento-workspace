import { Broker, Prisma, TeamMembership } from "@prisma/client";
import {
  generateBareId,
  makeEntityId,
  ubentoAuth,
  ubentoEntities,
} from "@ubento/primitives";
import {
  isPrismaConstraintError,
  NotFoundError,
  ValidationError,
} from "@ubento/service-toolkit";
import { OrganizationMembership as WOOrganizationMembership } from "@workos-inc/node";
import { authorizer } from "../../../lib/authorizer.js";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";
import { workosRoleFromInternalRole } from "./team.js";

export async function listTeamMembers(teamId: string) {
  const memberships = await prisma.teamMembership.findMany({
    where: {
      team_id: teamId,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: memberships.map((m) => m.user_id),
      },
    },
  });

  return users;
}

export async function addMemberToTeam({
  teamId,
  userId,
  role,
}: {
  teamId: string;
  userId: string;
  role: string;
}) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  if (!team) {
    throw new NotFoundError("Team not found");
  }

  let membership: TeamMembership | null = null;
  let workosMembership: WOOrganizationMembership | null = null;

  try {
    membership = await prisma.teamMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.teamMembership.code,
          bareId: generateBareId(),
        }),
        team_id: teamId,
        user_id: userId,
        role,
      },
    });

    if (team.broker === Broker.WORKOS) {
      workosMembership =
        await workos.userManagement.createOrganizationMembership({
          organizationId: team.broker_id,
          userId: userId,
          roleSlug: workosRoleFromInternalRole(role),
        });
    }

    // SYNC AUTHORIZER
    await authorizer.assignRole(
      userId,
      role,
      ubentoAuth.scopes.team({ team_id: teamId }),
    );

    return membership;
  } catch (e) {
    if (workosMembership) {
      await workos.userManagement.deleteOrganizationMembership(
        workosMembership.id,
      );
    }
    if (membership) {
      await prisma.teamMembership.delete({
        where: {
          id: membership.id,
        },
      });
    }

    if (isPrismaConstraintError(Prisma, e)) {
      throw new ValidationError("User is already a member of this team");
    }

    throw e;
  }
}

export async function removeMemberFromTeam({
  teamId,
  userId,
}: {
  teamId: string;
  userId: string;
}) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  if (!team) {
    throw new NotFoundError("Team not found");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Find memberships to know which roles to revoke
  const memberships = await prisma.teamMembership.findMany({
    where: {
      team_id: teamId,
      user_id: userId,
    },
  });

  // Delete local membership
  await prisma.teamMembership.deleteMany({
    where: {
      team_id: teamId,
      user_id: userId,
    },
  });

  // SYNC AUTHORIZER
  await Promise.all(
    memberships.map((m) =>
      authorizer.revokeRole(
        userId,
        m.role,
        ubentoAuth.scopes.team({ team_id: teamId }),
      ),
    ),
  );

  if (team.broker === Broker.WORKOS && user.broker === Broker.WORKOS) {
    const memberships = await workos.userManagement.listOrganizationMemberships(
      {
        organizationId: team.broker_id,
        userId: user.broker_id,
      },
    );
    if (memberships.data.length > 0) {
      await Promise.all(
        memberships.data.map((m) =>
          workos.userManagement.deleteOrganizationMembership(m.id),
        ),
      );
    }
  }
}

export async function listUserTeams(userId: string) {
  const memberships = await prisma.teamMembership.findMany({
    where: {
      user_id: userId,
    },
  });

  const teams = await prisma.team.findMany({
    where: {
      id: {
        in: memberships.map((m) => m.team_id),
      },
    },
  });

  return teams;
}
