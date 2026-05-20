import { OAuthClient } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  NotFoundError,
  prismaListWithCursor,
  ValidationError,
} from "@ubento/services.toolkit";
import { z } from "zod";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";
import { getConnectionProvider } from "./connection_provider.js";

export const oauthClientCredentialsSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});
export type OAuthClientCredentials = z.infer<
  typeof oauthClientCredentialsSchema
>;

export type SafeOAuthClient = Omit<OAuthClient, "credentials">;
export type OAuthClientWithCredentials = SafeOAuthClient & {
  credentials?: OAuthClientCredentials;
};

function safeOAuthClient<T extends OAuthClient>(
  client: T,
): Omit<T, "credentials"> {
  const { credentials, ...safe } = client;
  return safe;
}

export async function listOAuthClients({
  team_id,
  provider_id,
  cursor,
  limit,
}: {
  team_id?: string;
  provider_id?: string;
  cursor?: string;
  limit?: number;
}) {
  const result = await prismaListWithCursor(prisma.oAuthClient, {
    limit,
    cursor,
    where: {
      ...(team_id && { team_id }),
      ...(provider_id && { provider_id }),
    },
    include: { provider: true },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    resolveCursor: (c) => ({ id: c.id }),
  });

  return {
    ...result,
    data: result.data.map(safeOAuthClient),
  };
}

export async function getOAuthClient(id: string) {
  const client = await prisma.oAuthClient.findUnique({
    where: { id },
    include: { provider: true },
  });
  return client ? safeOAuthClient(client) : null;
}

export async function getDefaultOAuthClient(providerId: string) {
  const client = await prisma.oAuthClient.findFirst({
    where: { provider_id: providerId, team_id: null },
    include: { provider: true },
  });
  return client ? safeOAuthClient(client) : null;
}

export async function getOAuthClientWithCredentials(
  id: string,
): Promise<OAuthClientWithCredentials | undefined> {
  const client = await prisma.oAuthClient.findUnique({
    where: { id },
    include: { provider: true },
  });
  if (!client) {
    return;
  }

  const safeClient = safeOAuthClient(client);

  if (!client.credentials) {
    throw new Error(`OAuth Client ${id} has no credentials`);
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: client.credentials.iv,
    authTag: client.credentials.auth_tag,
    cipherText: client.credentials.cipher_text,
  });

  const parsedCredentials = oauthClientCredentialsSchema.parse(
    JSON.parse(decryptedString),
  );

  return {
    ...safeClient,
    credentials: parsedCredentials,
  };
}

export async function createOAuthClient({
  team_id,
  provider_id,
  name,
  credentials,
}: {
  team_id?: string;
  provider_id: string;
  name: string;
  credentials: OAuthClientCredentials;
}) {
  const provider = await getConnectionProvider(provider_id);
  if (!provider) {
    throw new NotFoundError(`connection_provider ${provider_id}`);
  }

  const parsedCredentials = oauthClientCredentialsSchema.safeParse(credentials);
  if (!parsedCredentials.success) {
    throw new ValidationError(
      `Invalid OAuth credentials\n${parsedCredentials.error.message}`,
    );
  }

  const encryptedData = await cryptoUtils.encrypt(
    JSON.stringify(parsedCredentials.data),
  );

  const newClientId = makeEntityId({
    code: ubentoEntities.oauthClient.code,
    bareId: generateBareId(),
  });

  const result = await prisma.oAuthClient.create({
    data: {
      id: newClientId,
      team_id,
      provider_id,
      name,
      credentials: {
        iv: encryptedData.iv,
        auth_tag: encryptedData.authTag,
        cipher_text: encryptedData.cipherText,
      },
    },
  });

  return safeOAuthClient(result);
}

export async function updateOAuthClient(
  id: string,
  data: {
    name?: string;
    credentials?: OAuthClientCredentials;
  },
) {
  const client = await getOAuthClient(id);
  if (!client) {
    throw new NotFoundError(`oauth_client ${id}`);
  }

  const updateData: any = {};
  if (data.name) {
    updateData.name = data.name;
  }

  if (data.credentials) {
    const parsedCredentials = oauthClientCredentialsSchema.safeParse(
      data.credentials,
    );
    if (!parsedCredentials.success) {
      throw new ValidationError(
        `Invalid OAuth credentials\n${parsedCredentials.error.message}`,
      );
    }

    const encryptedData = await cryptoUtils.encrypt(
      JSON.stringify(parsedCredentials.data),
    );
    updateData.credentials = {
      iv: encryptedData.iv,
      auth_tag: encryptedData.authTag,
      cipher_text: encryptedData.cipherText,
    };
  }

  const result = await prisma.oAuthClient.update({
    where: { id },
    data: updateData,
  });

  return safeOAuthClient(result);
}

export async function deleteOAuthClient(id: string) {
  const result = await prisma.oAuthClient.delete({ where: { id } });
  return safeOAuthClient(result);
}
