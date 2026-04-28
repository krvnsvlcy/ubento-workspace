import { ValidationError } from "@ubento/service-toolkit";
import get from "lodash.get";
import z from "zod";
import prisma from "../lib/prisma.js";
import {
  ConnectionAuth,
  createConnection,
  updateConnectionAuth,
} from "./connection.js";
import {
  connectionProviderConfigSchema,
  getConnectionProvider,
} from "./connection_provider.js";

/**
 * Normalizes the raw token response from a provider into our internal schema
 * using the mapping defined in the provider's configuration.
 */
export function parseOAuthData(
  tokenResponse: Record<string, any>,
  config: z.infer<typeof connectionProviderConfigSchema>,
): Extract<ConnectionAuth, { type: "oauth2" }> {
  const authConfig = config.authStrategies?.find((s) => s.type === "oauth2");

  // Safety check: ensure we are actually dealing with an OAuth2 provider
  if (!authConfig || authConfig.type !== "oauth2") {
    throw new Error("Cannot parse OAuth data for a non-oauth2 provider config");
  }

  const mapping = authConfig.tokenResponseMapping;

  return {
    type: "oauth2",
    access_token: get(tokenResponse, mapping.accessToken),
    refresh_token: get(tokenResponse, mapping.refreshToken),
    expires_in: get(tokenResponse, mapping.expiresIn),
    token_type: get(tokenResponse, mapping.tokenType),
    scope: get(tokenResponse, mapping.scope),
    _raw: tokenResponse,
  };
}

export async function getAuthUrl({
  providerId,
  organizationId,
  redirectUri,
  state,
}: {
  providerId: string;
  organizationId: string;
  redirectUri: string;
  state?: string;
}) {
  const provider = await getConnectionProvider(providerId);
  if (!provider) throw new Error("Provider not found");

  // 1. Validate config
  const config = connectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.authStrategies?.find((s) => s.type === "oauth2");

  if (!authConfig || authConfig.type !== "oauth2") {
    throw new ValidationError(
      `Unsupported auth type for oauth flow: ${authConfig?.type || "none"}`,
    );
  }

  // 2. Create the OAuth state record
  const connState = await prisma.oAuthConnectionState.create({
    data: {
      organization_id: organizationId,
      provider_id: providerId,
      expires_at: new Date(Date.now() + 5 * 60 * 1000), // in 5 minutes
      state,
    },
  });

  // 3. Construct URL
  const authUrl = new URL(authConfig.authorizationUrl);
  authUrl.searchParams.append("client_id", authConfig.clientId);
  authUrl.searchParams.append("redirect_uri", redirectUri);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("state", connState.id);

  // 4. Handle Scopes & Dynamic Discovery
  let finalScopes = authConfig.scopes || [];

  if (finalScopes.includes("*")) {
    try {
      // Guess the issuer base URL from the authorization URL
      const authOrigin = new URL(authConfig.authorizationUrl).origin;

      // Try OAuth 2.0 Auth Server Metadata first, fallback to OIDC Discovery
      let metadataRes = await fetch(
        `${authOrigin}/.well-known/oauth-authorization-server`,
      );
      if (!metadataRes.ok) {
        metadataRes = await fetch(
          `${authOrigin}/.well-known/openid-configuration`,
        );
      }

      if (metadataRes.ok) {
        const metadata = await metadataRes.json();
        if (Array.isArray(metadata.scopes_supported)) {
          // Merge discovered scopes, remove the literal "*", and deduplicate
          finalScopes = [
            ...finalScopes.filter((s) => s !== "*"),
            ...metadata.scopes_supported,
          ];
          finalScopes = [...new Set(finalScopes)];
          console.log(
            `[OAuth] Dynamically discovered ${metadata.scopes_supported.length} scopes for ${providerId}`,
          );
        }
      } else {
        console.warn(
          `[OAuth] No metadata endpoint found for ${providerId} at ${authOrigin}`,
        );
        // If it fails, remove the "*" so we don't send an invalid literal "*" string to the provider
        finalScopes = finalScopes.filter((s) => s !== "*");
      }
    } catch (err) {
      console.error(`[OAuth] Failed to fetch metadata for ${providerId}:`, err);
      finalScopes = finalScopes.filter((s) => s !== "*");
    }
  }

  // 5. Append scopes if they exist
  if (finalScopes.length > 0) {
    authUrl.searchParams.append("scope", finalScopes.join(" "));
  }

  return authUrl.toString();
}

export async function handleOAuthCallback(
  code: string,
  state: string, // This is the ID of our state record
  redirectUri: string,
) {
  // 1. Fetch the state record
  const stateRecord = await prisma.oAuthConnectionState.findUnique({
    where: { id: state },
  });
  if (!stateRecord) throw new Error("Invalid state parameter");

  // 2. Delete state immediately to prevent Replay Attacks
  await prisma.oAuthConnectionState.delete({ where: { id: stateRecord.id } });

  // 3. Manual expiration check (in case Mongo TTL hasn't run yet)
  if (stateRecord.expires_at < new Date()) {
    throw new Error("OAuth state has expired");
  }

  const provider = await getConnectionProvider(stateRecord.provider_id);
  if (!provider) throw new Error("Provider not found");

  // 4. Extract correctly typed auth config
  const config = connectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.authStrategies?.find((s) => s.type === "oauth2");
  if (!authConfig || authConfig.type !== "oauth2") {
    throw new Error("Provider is not configured for OAuth2");
  }

  // 5. Exchange token (using the camelCase properties from your TS Type)
  const response = await fetch(authConfig.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: authConfig.clientId,
      client_secret: authConfig.clientSecret,
      redirect_uri: redirectUri,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to exchange token");
  }
  const tokenResponse = await response.json();

  // 6. Find or create connection
  let connection = await prisma.connection.findFirst({
    where: {
      organization_id: stateRecord.organization_id,
      provider_id: stateRecord.provider_id,
    },
  });

  const authData = parseOAuthData(tokenResponse, config);

  if (connection) {
    const updated = await updateConnectionAuth(connection.id, authData);
    return {
      connection: updated,
      clientState: stateRecord.state,
    };
  } else {
    const created = await createConnection({
      organization_id: stateRecord.organization_id,
      provider_id: stateRecord.provider_id,
      auth: authData,
    });
    return {
      connection: created,
      clientState: stateRecord.state,
    };
  }
}
