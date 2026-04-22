import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import {
  isPrismaConstraintError,
  NotFoundError,
  ValidationError,
} from "@ubento/service-toolkit";
import { Broker, OrganizationMembership, Prisma } from "@prisma/client";
import { OrganizationMembership as WOOrganizationMembership } from "@workos-inc/node";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";
import { workosRoleFromInternalRole } from "./organization.js";

export async function listOrganizationMembers(organizationId: string) {
  const memberships = await prisma.organizationMembership.findMany({
    where: {
      organization_id: organizationId,
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

export async function addMemberToOrganization({
  organizationId,
  userId,
  role,
}: {
  organizationId: string;
  userId: string;
  role: string;
}) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
  if (!organization) {
    throw new NotFoundError("Organization not found");
  }

  let membership: OrganizationMembership | null = null;
  let workosMembership: WOOrganizationMembership | null = null;

  try {
    membership = await prisma.organizationMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.organizationMembership.code,
          bareId: generateBareId(),
        }),
        organization_id: organizationId,
        user_id: userId,
        role,
      },
    });

    if (organization.broker === Broker.WORKOS) {
      workosMembership =
        await workos.userManagement.createOrganizationMembership({
          organizationId: organization.broker_id,
          userId: userId,
          roleSlug: workosRoleFromInternalRole(role),
        });
    }

    return membership;
  } catch (e) {
    if (workosMembership) {
      await workos.userManagement.deleteOrganizationMembership(
        workosMembership.id,
      );
    }
    if (membership) {
      await prisma.organizationMembership.delete({
        where: {
          id: membership.id,
        },
      });
    }

    if (isPrismaConstraintError(Prisma, e)) {
      throw new ValidationError(
        "User is already a member of this organization",
      );
    }

    throw e;
  }
}

export async function removeMemberFromOrganization({
  organizationId,
  userId,
}: {
  organizationId: string;
  userId: string;
}) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
  if (!organization) {
    throw new NotFoundError("Organization not found");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Delete local membership
  await prisma.organizationMembership.deleteMany({
    where: {
      organization_id: organizationId,
      user_id: userId,
    },
  });

  if (organization.broker === Broker.WORKOS && user.broker === Broker.WORKOS) {
    const memberships = await workos.userManagement.listOrganizationMemberships(
      {
        organizationId: organization.broker_id,
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

export async function listUserOrganizations(userId: string) {
  const memberships = await prisma.organizationMembership.findMany({
    where: {
      user_id: userId,
    },
  });

  const organizations = await prisma.organization.findMany({
    where: {
      id: {
        in: memberships.map((m) => m.organization_id),
      },
    },
  });

  return organizations;
}
