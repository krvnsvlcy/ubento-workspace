import { AuthCode } from "@prisma/client";
import crypto from "crypto";
import prisma from "../../lib/prisma.js";

const AUTH_CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function createAuthCode({
  sessionId,
  clientId,
}: {
  sessionId: string;
  clientId: string;
}): Promise<string> {
  const code = crypto.randomBytes(32).toString("hex");

  await prisma.authCode.create({
    data: {
      code,
      session_id: sessionId,
      client_id: clientId,
      expires_at: new Date(Date.now() + AUTH_CODE_TTL_MS),
    },
  });

  return code;
}

export async function consumeAuthCode(code: string): Promise<AuthCode | null> {
  const authCode = await prisma.authCode.findUnique({
    where: { code },
  });

  if (!authCode) {
    return null;
  }

  await prisma.authCode
    .delete({
      where: { id: authCode.id },
    })
    .catch(() => {});

  if (authCode.expires_at < new Date()) {
    return null;
  }

  return authCode;
}
