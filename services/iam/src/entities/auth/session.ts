import { Prisma, Session, SessionStatus } from "@ubento/services.database/iam";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { NotFoundError, prismaListWithCursor } from "@ubento/services.toolkit";
import crypto from "crypto";
import prisma from "../../lib/prisma.js";

const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 2 weeks
const REFRESH_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 1 day

function sanitizeSession(session: Session) {
  const { refresh_token, refresh_token_rotated_at, ...rest } = session;
  return rest;
}
export type SanitizedSession = ReturnType<typeof sanitizeSession>;

export async function listSessions(filters?: {
  user_id?: string;
  limit?: number;
  cursor?: string;
  status?: SessionStatus;
  created_after?: Date;
  created_before?: Date;
  ip?: string;
  user_agent?: string;
}) {
  const { items, ...rest } = await prismaListWithCursor(prisma.session, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.user_id && { user_id: filters.user_id }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.created_after && {
        created_at: { gte: filters.created_after },
      }),
      ...(filters?.created_before && {
        created_at: { lte: filters.created_before },
      }),
      ...(filters?.ip && { ip: filters.ip }),
      ...(filters?.user_agent && { user_agent: filters.user_agent }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });

  return {
    ...rest,
    items: items.map(sanitizeSession),
  };
}
export async function getSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });
  return session ? sanitizeSession(session) : null;
}
export async function revokeSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
      status: SessionStatus.ACTIVE,
      expires_at: { gte: new Date() },
    },
  });
  if (!session) {
    throw new NotFoundError("Session does not exist or is not active.");
  }
  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: {
      status: SessionStatus.REVOKED,
      revoked_at: new Date(),
    },
  });
  return sanitizeSession(updatedSession);
}
export async function createSession({
  userId,
  ip,
  userAgent,
  metadata,
}: {
  userId: string;
  ip?: string | null;
  userAgent?: string | null;
  metadata?: Prisma.JsonValue | null;
}) {
  const sessionId = makeEntityId({
    code: ubentoEntities.session.code,
    bareId: generateBareId(),
  });

  const refreshToken = crypto.randomBytes(32).toString("hex");

  return await prisma.session.create({
    data: {
      id: sessionId,
      user_id: userId,
      status: SessionStatus.ACTIVE,
      expires_at: new Date(Date.now() + SESSION_TTL_MS),
      refresh_token: refreshToken,
      refresh_token_rotated_at: new Date(),
      ip,
      user_agent: userAgent,
      metadata,
    },
  });
}

export async function validateSession(session: SanitizedSession) {
  if (session.status !== SessionStatus.ACTIVE) return false;
  if (session.expires_at.getTime() < Date.now()) {
    await prisma.session.update({
      where: { id: session.id },
      data: { status: SessionStatus.EXPIRED },
    });
    return false;
  }
  return true;
}
export async function getSessionByRefreshToken(refreshToken: string) {
  const session = await prisma.session.findUnique({
    where: { refresh_token: refreshToken },
  });

  if (!session) return null;

  const isValid = await validateSession(session);
  if (!isValid) {
    return null;
  }

  return session;
}
export async function getActualizedRefreshToken(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    throw new NotFoundError("Session does not exist.");
  }
  const isValid = await validateSession(session);
  if (!isValid) {
    throw new Error("Session is not valid.");
  }
  if (
    session.refresh_token_rotated_at &&
    session.refresh_token_rotated_at.getTime() <
      Date.now() - REFRESH_TOKEN_TTL_MS
  ) {
    const newRefreshToken = crypto.randomBytes(32).toString("hex");
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refresh_token: newRefreshToken,
        refresh_token_rotated_at: new Date(),
        expires_at: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      },
    });
    return newRefreshToken;
  }
  return session.refresh_token;
}
