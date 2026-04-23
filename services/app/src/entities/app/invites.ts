import { AppInvite, AppInviteStatus, AppMembership } from "@ubento/database/app";
import {
  generateBareId,
  makeEntityId,
  ubentoAuth,
  ubentoEntities,
} from "@ubento/primitives";
import {
  NotFoundError,
  ValidationError,
  prismaListWithCursor,
} from "@ubento/service-toolkit";
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

function sanitizeInvite(invite: AppInvite) {
  const { token_hash, ...rest } = invite;
  return rest;
}

export async function listAppInvites({
  app_id,
  statuses,
  email,
  limit,
  cursor,
}: {
  app_id: string;
  statuses?: AppInviteStatus[];
  email?: string;
  limit?: number;
  cursor?: string;
}) {
  const { items, ...rest } = await prismaListWithCursor(prisma.appInvite, {
    limit,
    cursor,
    orderBy: { created_at: "desc" },
    where: {
      app_id,
      ...(statuses && { status: { in: statuses } }),
      ...(email && { email: { contains: email, mode: "insensitive" } }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });

  return {
    ...rest,
    items: items.map(sanitizeInvite),
  };
}

export async function createAppInvite({
  app_id,
  email,
  role,
  invited_by,
  expires_in_seconds = 259200, // 3 days default
}: {
  app_id: string;
  email: string;
  role: string;
  invited_by: string;
  expires_in_seconds?: number;
}) {
  const app = await prisma.app.findUnique({ where: { id: app_id } });
  if (!app) {
    throw new NotFoundError("App not found");
  }

  const existingInvite = await prisma.appInvite.findFirst({
    where: {
      app_id,
      email: email.toLowerCase(),
      status: AppInviteStatus.PENDING,
    },
  });

  if (existingInvite) {
    throw new ValidationError("An active invite already exists for this email");
  }

  const { token, hash } = generateInviteToken();
  const expiresAt = new Date(Date.now() + expires_in_seconds * 1000);

  const invite = await prisma.appInvite.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.appInvite.code,
        bareId: generateBareId(),
      }),
      app_id,
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

export async function acceptAppInvite({
  id,
  token,
  accepted_by,
}: {
  id: string;
  token: string;
  accepted_by: string;
}) {
  const invite = await prisma.appInvite.findUnique({ where: { id } });
  if (!invite) throw new NotFoundError("Invite not found");
  if (invite.status !== AppInviteStatus.PENDING)
    throw new ValidationError("Invite cannot be accepted");
  if (invite.expires_at < new Date())
    throw new ValidationError("Invite has expired");
  if (!invite.token_hash || !checkInviteToken(token, invite.token_hash))
    throw new ValidationError("Invalid token");

  const app = await prisma.app.findUnique({ where: { id: invite.app_id } });
  if (!app) throw new NotFoundError("App not found");

  let membership: AppMembership | null = null;
  try {
    membership = await prisma.appMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.appMembership.code,
          bareId: generateBareId(),
        }),
        app_id: app.id,
        user_id: accepted_by,
        role: invite.role,
      },
    });

    // SYNC AUTHORIZER
    await authorizer.assignRole(
      accepted_by,
      invite.role,
      ubentoAuth.scopes.app({ team_id: app.team_id, app_id: app.id }),
    );

    const updatedInvite = await prisma.appInvite.update({
      where: { id },
      data: {
        status: AppInviteStatus.ACCEPTED,
        accepted_by,
        accepted_at: new Date(),
      },
    });

    return sanitizeInvite(updatedInvite);
  } catch (e) {
    if (membership) {
      await prisma.appMembership.delete({ where: { id: membership.id } });
    }
    throw e;
  }
}
