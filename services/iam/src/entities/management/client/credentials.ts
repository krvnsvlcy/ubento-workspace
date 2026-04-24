import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import { ClientCredential, ClientCredentialStatus } from "@ubento/database/iam";
import crypto from "node:crypto";
import prisma from "../../../lib/prisma.js";

export function generateClientCredentialSecret() {
  const secret = crypto.randomBytes(32).toString("hex");
  const val = `sk_${secret}`;
  let hash = crypto.createHash("sha256").update(val).digest("hex");
  hash = `sha256:${hash}`;
  return { secret: val, hash };
}
export function sanitizeClientCredential(cred: ClientCredential) {
  const { secret_hash, ...rest } = cred;
  return rest;
}

export async function createClientCredential({
  clientId,
  label,
}: {
  clientId: string;
  label?: string;
}) {
  const id = makeEntityId({
    code: ubentoEntities.clientCredential.code,
    bareId: generateBareId(),
  });
  const { secret, hash } = generateClientCredentialSecret();

  const cred = await prisma.clientCredential.create({
    data: {
      id,
      client_id: clientId,
      label,
      secret_hash: hash,
      status: ClientCredentialStatus.ACTIVE,
    },
  });

  return { ...sanitizeClientCredential(cred), secret };
}
export async function revokeClientCredential(id: string) {
  return await prisma.clientCredential.update({
    where: { id },
    data: {
      status: ClientCredentialStatus.REVOKED,
      revoked_at: new Date(),
    },
  });
}
export async function getClientCredential(id: string) {
  return await prisma.clientCredential.findUnique({
    where: { id },
  });
}
export async function listClientCredentials(filters?: {
  client_id?: string;
  status?: ClientCredentialStatus;
  label?: string;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.clientCredential, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.label && { label: { contains: filters.label } }),
      ...(filters?.client_id && { client_id: filters.client_id }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.created_after && {
        created_at: { gte: filters.created_after },
      }),
      ...(filters?.created_before && {
        created_at: { lte: filters.created_before },
      }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}
export async function deleteClientCredential(id: string) {
  return await prisma.clientCredential.delete({
    where: { id },
  });
}

export async function useClientCredential({
  clientId,
  secret,
  ip,
}: {
  clientId: string;
  secret: string;
  ip?: string;
}) {
  const credentials = await prisma.clientCredential.findMany({
    where: {
      client_id: clientId,
      status: ClientCredentialStatus.ACTIVE,
    },
  });
  for (const cred of credentials) {
    if (cred.expires_at && cred.expires_at < new Date()) {
      await prisma.clientCredential.update({
        where: { id: cred.id },
        data: {
          status: ClientCredentialStatus.EXPIRED,
          expires_at: new Date(),
        },
      });
      continue;
    }
    if (cred.revoked_at) {
      await prisma.clientCredential.update({
        where: { id: cred.id },
        data: {
          status: ClientCredentialStatus.REVOKED,
        },
      });
      continue;
    }

    const [algo, hashString] = cred.secret_hash.split(":", 2);
    switch (algo) {
      case "sha256": {
        const computedHash = crypto
          .createHash("sha256")
          .update(secret)
          .digest("hex");
        const a = Buffer.from(computedHash);
        const b = Buffer.from(hashString);

        if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
          await prisma.clientCredential.update({
            where: { id: cred.id },
            data: {
              last_used_at: new Date(),
              last_used_ip: ip,
            },
          });
          return cred;
        }
        break;
      }
      default:
        break;
    }
  }
  return null;
}
