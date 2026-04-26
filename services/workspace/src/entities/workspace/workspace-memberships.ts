import { WorkspaceMembership, Prisma } from "@ubento/database/workspace";
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

export async function getWorkspaceMembership(id: string) {
  return await prisma.workspaceMembership.findUnique({
    where: { id },
  });
}

export async function listWorkspaceMemberships({
  workspace_id,
  user_id,
  limit,
  cursor,
}: {
  workspace_id?: string;
  user_id?: string;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.workspaceMembership, {
    limit,
    cursor,
    orderBy: { created_at: "desc" },
    where: {
      ...(workspace_id && { workspace_id }),
      ...(user_id && { user_id }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });
}

export async function addMemberToWorkspace({
  workspace_id,
  user_id,
  role,
}: {
  workspace_id: string;
  user_id: string;
  role: string;
}) {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspace_id },
  });
  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  let membership: WorkspaceMembership | null = null;

  try {
    membership = await prisma.workspaceMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.workspaceMembership.code,
          bareId: generateBareId(),
        }),
        workspace_id,
        user_id,
        role,
      },
    });

    // SYNC AUTHORIZER
    await authorizer.assignRole(
      user_id,
      role,
      ubentoAuth.scopes.workspace({ team_id: workspace.team_id, workspace_id }),
    );

    return membership;
  } catch (e) {
    if (membership) {
      await prisma.workspaceMembership.delete({
        where: { id: membership.id },
      });
    }

    if (isPrismaConstraintError(Prisma, e)) {
      throw new ValidationError("User is already a member of this workspace");
    }

    throw e;
  }
}

export async function removeMemberFromWorkspace(id: string) {
  const membership = await prisma.workspaceMembership.findUnique({
    where: { id },
  });
  if (!membership) {
    throw new NotFoundError("Membership not found");
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: membership.workspace_id },
  });
  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  // Delete local membership
  await prisma.workspaceMembership.delete({
    where: { id },
  });

  // SYNC AUTHORIZER
  await authorizer.revokeRole(
    membership.user_id,
    membership.role,
    ubentoAuth.scopes.workspace({ team_id: workspace.team_id, workspace_id: workspace.id }),
  );
}
