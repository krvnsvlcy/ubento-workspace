import { AppMembership, Prisma } from "@ubento/database/app";
import {
  generateBareId,
  makeEntityId,
  ubentoAuth,
  ubentoEntities,
} from "@ubento/primitives";
import {
  isPrismaConstraintError,
  NotFoundError,
  prismaListWithCursor,
  ValidationError,
} from "@ubento/service-toolkit";
import { authorizer } from "../../lib/authorizer.js";
import prisma from "../../lib/prisma.js";

export async function getAppMembership(id: string) {
  return await prisma.appMembership.findUnique({
    where: { id },
  });
}

export async function listAppMemberships({
  app_id,
  user_id,
  limit,
  cursor,
}: {
  app_id?: string;
  user_id?: string;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.appMembership, {
    limit,
    cursor,
    orderBy: { created_at: "desc" },
    where: {
      ...(app_id && { app_id }),
      ...(user_id && { user_id }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });
}

export async function addMemberToApp({
  app_id,
  user_id,
  role,
}: {
  app_id: string;
  user_id: string;
  role: string;
}) {
  const app = await prisma.app.findUnique({
    where: { id: app_id },
  });
  if (!app) {
    throw new NotFoundError("App not found");
  }

  let membership: AppMembership | null = null;

  try {
    membership = await prisma.appMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.appMembership.code,
          bareId: generateBareId(),
        }),
        app_id,
        user_id,
        role,
      },
    });

    // SYNC AUTHORIZER
    await authorizer.assignRole(
      user_id,
      role,
      ubentoAuth.scopes.app({ team_id: app.team_id, app_id }),
    );

    return membership;
  } catch (e) {
    if (membership) {
      await prisma.appMembership.delete({
        where: { id: membership.id },
      });
    }

    if (isPrismaConstraintError(Prisma, e)) {
      throw new ValidationError("User is already a member of this app");
    }

    throw e;
  }
}

export async function removeMemberFromApp(id: string) {
  const membership = await prisma.appMembership.findUnique({
    where: { id },
  });
  if (!membership) {
    throw new NotFoundError("Membership not found");
  }

  const app = await prisma.app.findUnique({
    where: { id: membership.app_id },
  });
  if (!app) {
    throw new NotFoundError("App not found");
  }

  // Delete local membership
  await prisma.appMembership.delete({
    where: { id },
  });

  // SYNC AUTHORIZER
  await authorizer.revokeRole(
    membership.user_id,
    membership.role,
    ubentoAuth.scopes.app({ team_id: app.team_id, app_id: app.id }),
  );
}
