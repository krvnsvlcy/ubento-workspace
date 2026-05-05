import {
  Connection,
  ConnectionProvider,
} from "@ubento/services.database/integration";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  NotFoundError,
  ValidationError,
  prismaListWithCursor,
} from "@ubento/services.toolkit";
import z from "zod";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";
import {
  connectionProviderConfigSchema,
  getConnectionProvider,
} from "./connection_provider.js";

export const basicAuthSchema = z.object({
  type: z.literal("basic"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const oauth2AuthSchema = z.object({
  type: z.literal("oauth2"),
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_in: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  _raw: z.any().optional(),
});

export const tokenAuthSchema = z.object({
  type: z.literal("token"),
  token: z.string().min(1, "Token is required"),
});

export const connectionAuthSchema = z.discriminatedUnion("type", [
  basicAuthSchema,
  oauth2AuthSchema,
  tokenAuthSchema,
]);
export type ConnectionAuth = z.infer<typeof connectionAuthSchema>;

export type SafeConnection = Omit<Connection, "auth">;
export type ConnectionWithAuth = SafeConnection & {
  provider: ConnectionProvider;
  auth?: ConnectionAuth;
};

function safeConnection<T extends Connection>(connection: T): Omit<T, "auth"> {
  const { auth, ...safe } = connection;
  return safe;
}

export async function listConnections({
  organization_id,
  cursor,
  limit,
}: {
  organization_id?: string;
  cursor?: string;
  limit?: number;
}) {
  const result = await prismaListWithCursor(prisma.connection, {
    limit,
    cursor,
    where: { ...(organization_id && { organization_id }) },
    include: { provider: true },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    resolveCursor: (c) => ({ id: c.id }),
  });

  return {
    ...result,
    items: result.items.map(safeConnection),
  };
}

export async function getConnection(id: string) {
  const connection = await prisma.connection.findUnique({
    where: { id },
    include: { provider: true },
  });
  return connection ? safeConnection(connection) : null;
}

export async function getConnectionWithAuth(
  id: string,
): Promise<ConnectionWithAuth | undefined> {
  const connection = await prisma.connection.findUnique({
    where: { id },
    include: { provider: true },
  });
  if (!connection) {
    return;
  }

  const safeConn = safeConnection(connection);

  // connection.auth refers to the raw encrypted DB payload here
  if (!connection.auth) {
    throw new Error(`Connection ${id} has no auth`);
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: connection.auth.iv,
    authTag: connection.auth.auth_tag,
    cipherText: connection.auth.cipher_text,
  });

  const parsedAuthData = connectionAuthSchema.parse(
    JSON.parse(decryptedString),
  );

  return {
    ...safeConn,
    auth: parsedAuthData,
  };
}
export async function getOrganizationConnectionWithAuth(
  provider_id: string,
  organization_id: string,
): Promise<ConnectionWithAuth | undefined> {
  const connection = await prisma.connection.findUnique({
    where: { provider_id_organization_id: { provider_id, organization_id } },
    include: { provider: true },
  });
  if (!connection) {
    return;
  }

  const safeConn = safeConnection(connection);

  // connection.auth refers to the raw encrypted DB payload here
  if (!connection.auth) {
    throw new Error(`Connection ${connection.id} has no auth`);
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: connection.auth.iv,
    authTag: connection.auth.auth_tag,
    cipherText: connection.auth.cipher_text,
  });

  const parsedAuthData = connectionAuthSchema.parse(
    JSON.parse(decryptedString),
  );

  return {
    ...safeConn,
    auth: parsedAuthData,
  } as ConnectionWithAuth;
}

export async function createConnection({
  organization_id,
  provider_id,
  auth,
}: {
  organization_id: string;
  provider_id: string;
  auth?: unknown;
}) {
  const provider = await getConnectionProvider(provider_id);
  if (!provider) {
    throw new NotFoundError(`connection_provider ${provider_id}`);
  }

  const parsedConfig = connectionProviderConfigSchema.safeParse(
    provider.config,
  );
  if (!parsedConfig.success) {
    throw new ValidationError(
      `Invalid connection provider config\n${parsedConfig.error.message}`,
    );
  }

  const config = parsedConfig.data;
  const newConnectionId = makeEntityId({
    code: ubentoEntities.connection.code,
    bareId: generateBareId(),
  });

  if (!config.authStrategies || config.authStrategies.length === 0) {
    const result = await prisma.connection.create({
      data: {
        id: newConnectionId,
        organization_id,
        provider_id,
      },
    });
    return safeConnection(result); // FIXED: Protect raw return
  }

  const parsedAuthData = connectionAuthSchema.safeParse(auth);
  if (!parsedAuthData.success) {
    throw new ValidationError(
      `Invalid connection auth\n${parsedAuthData.error.message}`,
    );
  }
  const authData = parsedAuthData.data;
  const strategy = config.authStrategies.find((s) => s.type === authData.type);

  if (!strategy) {
    throw new ValidationError(
      `Provider ${provider.display_name} does not support auth type ${authData.type}`,
    );
  }

  const encryptedData = await cryptoUtils.encrypt(JSON.stringify(authData));
  const result = await prisma.connection.upsert({
    where: {
      provider_id_organization_id: {
        provider_id,
        organization_id,
      },
    },
    update: {
      auth_strategy: authData.type,
      auth: {
        iv: encryptedData.iv,
        auth_tag: encryptedData.authTag,
        cipher_text: encryptedData.cipherText,
      },
    },
    create: {
      id: newConnectionId,
      organization_id,
      provider_id,
      auth_strategy: authData.type,
      auth: {
        iv: encryptedData.iv,
        auth_tag: encryptedData.authTag,
        cipher_text: encryptedData.cipherText,
      },
    },
  });

  return safeConnection(result); // FIXED: Protect raw return
}

export async function updateConnectionAuth(id: string, auth: unknown) {
  const connection = await getConnection(id);
  if (!connection) {
    throw new NotFoundError(`connection ${id}`);
  }

  const provider = await getConnectionProvider(connection.provider_id);
  if (!provider) {
    throw new NotFoundError(`connection_provider ${connection.provider_id}`);
  }

  const config = connectionProviderConfigSchema.parse(provider.config);

  if (!config.authStrategies || config.authStrategies.length === 0) {
    throw new ValidationError(
      `Connection provider ${provider.id} does not have auth`,
    );
  }

  const authData = connectionAuthSchema.parse(auth);
  const strategy = config.authStrategies.find((s) => s.type === authData.type);

  if (!strategy) {
    throw new ValidationError(
      `Provider ${provider.display_name} does not support auth type ${authData.type}`,
    );
  }

  const encryptedData = await cryptoUtils.encrypt(JSON.stringify(authData));
  const result = await prisma.connection.update({
    where: { id },
    data: {
      auth_strategy: authData.type,
      auth: {
        iv: encryptedData.iv,
        auth_tag: encryptedData.authTag,
        cipher_text: encryptedData.cipherText,
      },
    },
  });

  return safeConnection(result); // FIXED: Protect raw return
}

export async function deleteConnection(id: string) {
  const result = await prisma.connection.delete({ where: { id } });
  return safeConnection(result); // FIXED: Protect raw return
}
