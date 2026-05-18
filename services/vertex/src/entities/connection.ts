import { Connection } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  InternalServerError,
  NotFoundError,
  prismaListWithCursor,
  ValidationError,
} from "@ubento/services.toolkit";
import {
  ConnectionCredentials,
  connectionCredentialsSchema,
  ConnectionProviderConfig_r,
  connectionProviderConfigSchema,
} from "@ubento/vertex.core";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";
import { getConnectionProvider } from "./connection_provider.js";

export type SafeConnection = Omit<Connection, "credentials">;
export type ConnectionWithAuth = SafeConnection & {
  provider: {
    name: string;
    config: ConnectionProviderConfig_r;
  };
  auth?: ConnectionCredentials;
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
}: {
  team_id?: string;
  cursor?: string;
  limit?: number;
}) {
  const result = await prismaListWithCursor(prisma.connection, {
    limit,
    cursor,
    where: { ...(team_id && { team_id }) },
    include: { provider: true },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    resolveCursor: (c) => ({ id: c.id }),
  });

  return {
    ...result,
    data: result.data.map(safeConnection),
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

  // connection.credentials refers to the raw encrypted DB payload here
  if (!connection.credentials) {
    throw new Error(`Connection ${id} has no auth`);
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: connection.credentials.iv,
    authTag: connection.credentials.auth_tag,
    cipherText: connection.credentials.cipher_text,
  });

  const parsedAuthData = connectionCredentialsSchema.parse(
    JSON.parse(decryptedString),
  );

  return {
    ...safeConn,
    provider: {
      ...safeConn.provider,
      config: safeConn.provider.config as unknown as ConnectionProviderConfig_r,
    },
    auth: parsedAuthData,
  };
}

export async function getTeamConnection(
  team_id: string,
  provider_name: string,
) {
  const connection = await prisma.connection.findFirst({
    where: { provider: { name: provider_name }, team_id },
    include: { provider: true },
  });
  return connection ? safeConnection(connection) : null;
}

export async function getTeamConnectionWithAuth(
  team_id: string,
  connectionSpec: { provider: string },
): Promise<ConnectionWithAuth | undefined> {
  const connection = await prisma.connection.findFirst({
    where: {
      provider: {
        code: connectionSpec.provider,
      },
      team_id,
    },
    include: { provider: true },
  });
  if (!connection) {
    return;
  }

  const safeConn = safeConnection(connection);

  // connection.credentials refers to the raw encrypted DB payload here
  if (!connection.credentials) {
    throw new Error(`Connection ${connection.id} has no auth`);
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: connection.credentials.iv,
    authTag: connection.credentials.auth_tag,
    cipherText: connection.credentials.cipher_text,
  });

  const parsedAuthData = connectionCredentialsSchema.parse(
    JSON.parse(decryptedString),
  );

  return {
    ...safeConn,
    provider: {
      ...safeConn.provider,
      config: safeConn.provider.config as unknown as ConnectionProviderConfig_r,
    },
    auth: parsedAuthData,
  };
}

export async function createConnection({
  team_id,
  provider_id,
  name,
  description,
  credentials,
}: {
  team_id: string;
  provider_id: string;
  name?: string;
  description?: string;
  credentials?: unknown;
}) {
  const provider = await getConnectionProvider(provider_id);
  if (!provider) {
    throw new NotFoundError(`connection_provider ${provider_id}`);
  }

  const parsedConfig = connectionProviderConfigSchema.safeParse(
    provider.config,
  );
  if (!parsedConfig.success) {
    throw new InternalServerError(
      `Invalid connection provider config for ${provider.code}: ${parsedConfig.error.message}`,
    );
  }

  const config = parsedConfig.data;
  const newConnectionId = makeEntityId({
    code: ubentoEntities.connection.code,
    bareId: generateBareId(),
  });

  if (!config.auth) {
    const result = await prisma.connection.create({
      data: {
        id: newConnectionId,
        team_id,
        provider_id,
        name: name || provider.name,
        description,
        credentials: {
          iv: "",
          auth_tag: "",
          cipher_text: "",
        },
      },
    });
    return safeConnection(result); // FIXED: Protect raw return
  }

  const parsedAuthData = connectionCredentialsSchema.safeParse(credentials);
  if (!parsedAuthData.success) {
    throw new ValidationError(
      `Invalid connection auth\n${parsedAuthData.error.message}`,
    );
  }
  const authData = parsedAuthData.data;
  const strategy =
    parsedAuthData.data.type === "api_key"
      ? config.auth?.apiKey
      : parsedAuthData.data.type === "oauth2"
        ? config.auth?.oauth2
        : parsedAuthData.data.type === "basic"
          ? config.auth?.basic
          : null;

  if (!strategy) {
    throw new ValidationError(
      `Provider ${provider.name} does not support auth type ${authData.type}`,
    );
  }

  const encryptedData = await cryptoUtils.encrypt(JSON.stringify(authData));
  const existingConnection = await prisma.connection.findFirst({
    where: { provider_id, team_id },
  });

  let result;
  if (existingConnection) {
    result = await prisma.connection.update({
      where: { id: existingConnection.id },
      data: {
        credentials: {
          iv: encryptedData.iv,
          auth_tag: encryptedData.authTag,
          cipher_text: encryptedData.cipherText,
        },
      },
    });
  } else {
    result = await prisma.connection.create({
      data: {
        id: newConnectionId,
        team_id,
        provider_id,
        name: name || `Connection for ${provider.name}`,
        description,
        credentials: {
          iv: encryptedData.iv,
          auth_tag: encryptedData.authTag,
          cipher_text: encryptedData.cipherText,
        },
      },
    });
  }

  return safeConnection(result); // FIXED: Protect raw return
}

export async function updateConnectionAuth(
  id: string,
  auth?: unknown,
  name?: string,
) {
  const connection = await getConnection(id);
  if (!connection) {
    throw new NotFoundError(`connection ${id}`);
  }

  if (!auth) {
    if (!name) {
      throw new ValidationError("Either credentials or name must be provided");
    }
    const result = await prisma.connection.update({
      where: { id },
      data: { name },
    });
    return safeConnection(result);
  }

  const provider = await getConnectionProvider(connection.provider_id);
  if (!provider) {
    throw new NotFoundError(`connection_provider ${connection.provider_id}`);
  }

  const config = connectionProviderConfigSchema.parse(provider.config);

  if (!config.auth) {
    throw new ValidationError(
      `Connection provider ${provider.id} does not have auth`,
    );
  }

  const authData = connectionCredentialsSchema.parse(auth);
  const strategy =
    authData.type === "api_key"
      ? config.auth?.apiKey
      : authData.type === "oauth2"
        ? config.auth?.oauth2
        : authData.type === "basic"
          ? config.auth?.basic
          : null;

  if (!strategy) {
    throw new ValidationError(
      `Provider ${provider.name} does not support auth type ${authData.type}`,
    );
  }

  const encryptedData = await cryptoUtils.encrypt(JSON.stringify(authData));
  const result = await prisma.connection.update({
    where: { id },
    data: {
      ...(name && { name }),
      credentials: {
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
