import { ValidationError } from "@ubento/services.toolkit";
import {
  buildRequestUrl,
  ConnectionCredentials,
  connectionProviderConfigSchema,
  invokeHttpService,
  resolveObject,
} from "@ubento/vertex.core";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";
import { createConnection, updateConnectionAuth } from "./connection.js";
import { getConnectionProvider } from "./connection_provider.js";

export async function getAuthUrl({
  oauthClientId,
  teamId,
  redirectUri,
  state,
}: {
  oauthClientId: string;
  teamId: string;
  redirectUri: string;
  state?: string;
}) {
  const oauthClient = await prisma.oAuthClient.findUnique({
    where: { id: oauthClientId },
  });
  if (!oauthClient) throw new Error("OAuth Client not found");

  const provider = await getConnectionProvider(oauthClient.provider_id);
  if (!provider) throw new Error("Provider not found");

  // 1. Validate config
  const config = connectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.authStrategies?.find((s) => s.type === "oauth2");

  if (!authConfig || authConfig.type !== "oauth2") {
    throw new ValidationError(
      `Unsupported auth type for oauth flow: ${authConfig?.type || "none"}`,
    );
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: oauthClient.credentials.iv,
    authTag: oauthClient.credentials.auth_tag,
    cipherText: oauthClient.credentials.cipher_text,
  });
  const clientCredentials = JSON.parse(decryptedString);

  // 2. Create the OAuth state record
  const connState = await prisma.oAuthConnectionState.create({
    data: {
      team_id: teamId,
      oauth_client_id: oauthClientId,
      expires_at: new Date(Date.now() + 5 * 60 * 1000), // in 5 minutes
      state,
      redirect_uri: redirectUri,
    },
  });

  // 3. Resolve the authorize request
  const resolvedAuthorize = resolveObject(
    authConfig.handlers.authorize.request,
    {
      args: {
        client_id: clientCredentials.clientId || clientCredentials.client_id,
        redirect_uri: redirectUri,
        state: connState.id,
      },
    },
  );

  const authUrl = buildRequestUrl(
    resolvedAuthorize.path,
    resolvedAuthorize.baseUrl,
    resolvedAuthorize.query,
  );

  return authUrl.toString();
}

export async function handleOAuthCallback(
  code: string,
  state: string, // This is the ID of our state record
) {
  // 1. Fetch the state record
  const stateRecord = await prisma.oAuthConnectionState.findUnique({
    where: { id: state },
  });
  if (!stateRecord) throw new Error("Invalid state parameter");

  // 2. Delete state immediately to prevent Replay Attacks
  await prisma.oAuthConnectionState.delete({ where: { id: stateRecord.id } });

  // 3. Manual expiration check
  if (stateRecord.expires_at < new Date()) {
    throw new Error("OAuth state has expired");
  }

  const oauthClient = await prisma.oAuthClient.findUnique({
    where: { id: stateRecord.oauth_client_id },
  });
  if (!oauthClient) throw new Error("OAuth Client not found");

  const provider = await getConnectionProvider(oauthClient.provider_id);
  if (!provider) throw new Error("Provider not found");

  // 4. Extract correctly typed auth config
  const config = connectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.authStrategies?.find((s) => s.type === "oauth2");
  if (!authConfig || authConfig.type !== "oauth2") {
    throw new Error("Provider is not configured for OAuth2");
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: oauthClient.credentials.iv,
    authTag: oauthClient.credentials.auth_tag,
    cipherText: oauthClient.credentials.cipher_text,
  });
  const clientCredentials = JSON.parse(decryptedString);

  // 5. Exchange token using invokeHttpService
  const result = await invokeHttpService({
    handler: authConfig.handlers.token,
    args: {
      code,
      client_id: clientCredentials.clientId || clientCredentials.client_id,
      client_secret:
        clientCredentials.clientSecret || clientCredentials.client_secret,
      redirect_uri: stateRecord.redirect_uri || "",
    },
  });

  if (result.error) {
    throw new Error(`Failed to exchange token: ${result.error.message}`);
  }

  const tokenData = result.data as any;
  const authData: ConnectionCredentials = {
    type: "oauth2",
    accessToken: tokenData.accessToken || tokenData.access_token,
    refreshToken: tokenData.refreshToken || tokenData.refresh_token,
    expiresIn: tokenData.expiresIn || tokenData.expires_in,
    tokenType: tokenData.tokenType || tokenData.token_type,
    scope: tokenData.scope,
  };

  // 6. Find or create connection
  let connection = await prisma.connection.findFirst({
    where: {
      team_id: stateRecord.team_id,
      provider_id: oauthClient.provider_id,
    },
  });

  if (connection) {
    const updated = await updateConnectionAuth(connection.id, authData);
    return {
      connection: updated,
      clientState: stateRecord.state,
    };
  } else {
    const created = await createConnection({
      team_id: stateRecord.team_id,
      provider_id: oauthClient.provider_id,
      credentials: authData,
    });
    return {
      connection: created,
      clientState: stateRecord.state,
    };
  }
}
