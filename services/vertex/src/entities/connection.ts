import { Connection } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";

export type SafeConnection = Omit<Connection, "credentials">;

export type ConnectionWithAuth = SafeConnection & {
  auth?: unknown;
};

function safeConnection<T extends Connection>(
  connection: T,
): Omit<T, "credentials"> {
  const { credentials, ...safe } = connection;
  return safe;
}

export async function listConnections({
  team_id,
  cursor,
  limit,
  tags,
}: {
  team_id?: string;
  cursor?: string;
  limit?: number;
  tags?: string[];
}) {
  const result = await prismaListWithCursor(prisma.connection, {
    limit,
    cursor,
    where: {
      ...(team_id && { team_id }),
      ...(tags && { tags: { hasAll: tags } }),
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    resolveCursor: (c) => ({ id: c.id }),
  });

  const data = result.data.map((connection) => safeConnection(connection));

  return {
    ...result,
    data,
  };
}

export async function getConnection(
  id: string,
): Promise<SafeConnection | null> {
  const connection = await prisma.connection.findUnique({
    where: { id },
  });
  if (!connection) return null;
  return safeConnection(connection);
}

export async function createConnection({
  type,
  team_id,
  name,
  description,
  data,
  credentials,
}: {
  type: string;
  team_id: string;
  name: string;
  description?: string;
  data?: unknown;
  credentials?: unknown;
}) {
  const newConnectionId = makeEntityId({
    code: ubentoEntities.connection.code,
    bareId: generateBareId(),
  });

  const encryptedData = credentials
    ? await cryptoUtils.encrypt(JSON.stringify(credentials))
    : undefined;

  const result = await prisma.connection.create({
    data: {
      id: newConnectionId,
      team_id,
      type,
      name,
      description,
      data: data as any,
      credentials: encryptedData
        ? {
            iv: encryptedData.iv,
            auth_tag: encryptedData.authTag,
            cipher_text: encryptedData.cipherText,
          }
        : undefined,
    },
  });

  return safeConnection(result);
}

export async function updateConnection(
  id: string,
  payload: {
    name?: string;
    credentials?: unknown;
    data?: unknown;
  },
) {
  let encryptedCredentials = payload.credentials
    ? await cryptoUtils.encrypt(JSON.stringify(payload.credentials))
    : undefined;

  const connection = await prisma.connection.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      credentials: encryptedCredentials
        ? {
            iv: encryptedCredentials.iv,
            auth_tag: encryptedCredentials.authTag,
            cipher_text: encryptedCredentials.cipherText,
          }
        : undefined,
      data: payload.data as any,
    },
  });

  return safeConnection(connection);
}

export async function deleteConnection(id: string) {
  const result = await prisma.connection.delete({ where: { id } });
  return safeConnection(result);
}
