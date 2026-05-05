import {
  WorkspaceInvite,
  WorkspaceInviteStatus,
  WorkspaceMembership,
} from "@ubento/services.database/workspace";
import {
  generateBareId,
  makeEntityId,
  ubentoAuth,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  NotFoundError,
  ValidationError,
  prismaListWithCursor,
} from "@ubento/services.toolkit";
import crypto from "crypto";
import { authorizer } from "../../lib/authorizer.js";
import prisma from "../../lib/prisma.js";

function generateInviteToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = `sha256:${crypto.createHash("sha256").update(token).digest("hex")}`;
  return { token, hash };
}

function checkInviteToken(token: string, hash: string) {
  const [algo, hashString] = hash.split(":", 2);
  switch (algo) {
    case "sha256":
      return (
        crypto.createHash("sha256").update(token).digest("hex") === hashString
      );
    default:
      return false;
  }
}

function sanitizeInvite(invite: WorkspaceInvite) {
  const { token_hash, ...rest } = invite;
  return rest;
}

export async function listWorkspaceInvites({
  workspace_id,
  statuses,
  email,
  limit,
  cursor,
}: {
  workspace_id: string;
  statuses?: WorkspaceInviteStatus[];
  email?: string;
  limit?: number;
  cursor?: string;
}) {
  const { data, ...rest } = await prismaListWithCursor(prisma.workspaceInvite, {
    limit,
    cursor,
    orderBy: { created_at: "desc" },
    where: {
      workspace_id,
      ...(statuses && { status: { in: statuses } }),
      ...(email && { email: { contains: email, mode: "insensitive" } }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });

  return {
    ...rest,
    data: data.map(sanitizeInvite),
  };
}

export async function createWorkspaceInvite({
  workspace_id,
  email,
  role,
  invited_by,
  expires_in_seconds = 259200, // 3 days default
}: {
  workspace_id: string;
  email: string;
  role: string;
  invited_by: string;
  expires_in_seconds?: number;
}) {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspace_id },
  });
  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  const existingInvite = await prisma.workspaceInvite.findFirst({
    where: {
      workspace_id,
      email: email.toLowerCase(),
      status: WorkspaceInviteStatus.PENDING,
    },
  });

  if (existingInvite) {
    throw new ValidationError("An active invite already exists for this email");
  }

  const { token, hash } = generateInviteToken();
  const expiresAt = new Date(Date.now() + expires_in_seconds * 1000);

  const invite = await prisma.workspaceInvite.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.workspaceInvite.code,
        bareId: generateBareId(),
      }),
      workspace_id,
      email: email.toLowerCase(),
      role,
      token_hash: hash,
      expires_at: expiresAt,
      invited_by,
    },
  });

  return {
    invite: sanitizeInvite(invite),
    token,
  };
}

export async function acceptWorkspaceInvite({
  id,
  token,
  accepted_by,
}: {
  id: string;
  token: string;
  accepted_by: string;
}) {
  const invite = await prisma.workspaceInvite.findUnique({ where: { id } });
  if (!invite) throw new NotFoundError("Invite not found");
  if (invite.status !== WorkspaceInviteStatus.PENDING)
    throw new ValidationError("Invite cannot be accepted");
  if (invite.expires_at < new Date())
    throw new ValidationError("Invite has expired");
  if (!invite.token_hash || !checkInviteToken(token, invite.token_hash))
    throw new ValidationError("Invalid token");

  const workspace = await prisma.workspace.findUnique({
    where: { id: invite.workspace_id },
  });
  if (!workspace) throw new NotFoundError("Workspace not found");

  let membership: WorkspaceMembership | null = null;
  try {
    membership = await prisma.workspaceMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.workspaceMembership.code,
          bareId: generateBareId(),
        }),
        workspace_id: workspace.id,
        user_id: accepted_by,
        role: invite.role,
      },
    });

    // SYNC AUTHORIZER
    await authorizer.assignRole(
      accepted_by,
      invite.role,
      ubentoAuth.scopes.workspace({
        team_id: workspace.team_id,
        workspace_id: workspace.id,
      }),
    );

    const updatedInvite = await prisma.workspaceInvite.update({
      where: { id },
      data: {
        status: WorkspaceInviteStatus.ACCEPTED,
        accepted_by,
        accepted_at: new Date(),
      },
    });

    return sanitizeInvite(updatedInvite);
  } catch (e) {
    if (membership) {
      await prisma.workspaceMembership.delete({ where: { id: membership.id } });
    }
    throw e;
  }
}
