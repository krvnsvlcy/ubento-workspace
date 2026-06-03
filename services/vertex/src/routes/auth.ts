import { chain, validate, ValidationError } from "@ubento/services.toolkit";
import {
  buildRequestUrl,
  HttpConnectionCredentials,
  httpConnectionProviderConfigSchema,
  resolveObject,
  runHttpHandler, // <-- Imported runHttpHandler
} from "@ubento/vertex.core";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { createConnection, updateConnection } from "../entities/connection.js"; // <-- Fixed import path
import { getConnectionProvider } from "../entities/http_connection_provider.js";
import { oauthClientCredentialsSchema } from "../entities/oauth_client.js";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";

const router: Router = Router();

function getRedirectUri(req: Request) {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${protocol}://${host}/vertex/oauth/callback`;
}

async function getAuthUrl({
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
  const config = httpConnectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.auth?.oauth2;

  if (!authConfig) {
    throw new ValidationError(
      `Provider ${provider.handle} is not configured for oauth2 flow`,
    );
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: oauthClient.credentials.iv,
    authTag: oauthClient.credentials.auth_tag,
    cipherText: oauthClient.credentials.cipher_text,
  });

  const parsedClientCredentials = oauthClientCredentialsSchema.safeParse(
    JSON.parse(decryptedString),
  );
  if (!parsedClientCredentials.success) {
    throw new ValidationError("Invalid OAuth credentials");
  }
  const clientCredentials = parsedClientCredentials.data;

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

  // 3. Resolve the authorize request variables
  const resolvedAuthorize = resolveObject(authConfig.authorize.request, {
    clientId: clientCredentials.clientId,
    redirectUri: redirectUri,
    state: connState.id,
  });

  const authUrl = buildRequestUrl(
    resolvedAuthorize.path,
    resolvedAuthorize.baseUrl || authConfig.baseUrl,
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
  const config = httpConnectionProviderConfigSchema.parse(provider.config);
  const authConfig = config.auth?.oauth2;
  if (!authConfig) {
    throw new Error("Provider is not configured for OAuth2");
  }

  const decryptedString = await cryptoUtils.decrypt({
    iv: oauthClient.credentials.iv,
    authTag: oauthClient.credentials.auth_tag,
    cipherText: oauthClient.credentials.cipher_text,
  });
  const clientCredentials = JSON.parse(decryptedString);

  // 5. Exchange token using runHttpHandler
  const result = await runHttpHandler({
    handler: authConfig.token,
    baseUrl: authConfig.baseUrl,
    context: {
      grantType: "authorization_code",
      code: code,
      clientId: clientCredentials.clientId || clientCredentials.client_id,
      clientSecret:
        clientCredentials.clientSecret || clientCredentials.client_secret,
      redirectUri: stateRecord.redirect_uri || "",
    },
  });

  if (result.error) {
    throw new Error(`Failed to exchange token: ${result.error.message}`);
  }

  const tokenData = result.data as any;
  const authData: HttpConnectionCredentials = {
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
      type: "http",
      data: {
        equals: {
          providerId: oauthClient.provider_id,
        },
      },
    },
  });

  if (connection) {
    const updated = await updateConnection(connection.id, {
      credentials: authData,
    });
    return {
      connection: updated,
      clientState: stateRecord.state,
    };
  } else {
    const created = await createConnection({
      type: "http",
      team_id: stateRecord.team_id,
      name: provider.name,
      data: {
        providerId: oauthClient.provider_id,
      },
      credentials: authData,
    });
    return {
      connection: created,
      clientState: stateRecord.state,
    };
  }
}

router.get(
  "/vertex/oauth/connect",
  chain(
    validate({
      query: z.object({
        oauth_client_id: z.string().min(1),
        team_id: z.string().min(1),
        state: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { oauth_client_id, team_id, state } = req.query as {
        oauth_client_id: string;
        team_id: string;
        state?: string;
      };

      const authUrl = await getAuthUrl({
        oauthClientId: oauth_client_id,
        teamId: team_id,
        redirectUri: getRedirectUri(req),
        state,
      });
      res.redirect(authUrl);
    },
  ),
);

router.get(
  "/vertex/oauth/callback",
  chain(
    validate({
      query: z.object({
        code: z.string().optional(),
        state: z.string().optional(),
        error: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { code, state, error } = req.query as {
        code?: string;
        state?: string;
        error?: string;
      };

      if (error) {
        return res
          .status(400)
          .send(
            `<html><body><h1>Auth Failed</h1><p>${error}</p></body></html>`,
          );
      }

      if (!code || !state) {
        return res.status(400).send("code and state are required");
      }

      // 1. Process the actual OAuth logic
      const { clientState } = await handleOAuthCallback(code, state);

      // 2. Send the "Safe to Close" HTML
      res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Authentication Successful</title>
      <style>
        body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb; color: #111827; }
        .card { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        h1 { color: #059669; margin-bottom: 0.5rem; }
        p { color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Connection Successful!</h1>
        <p>You can safely close this window now.</p>
      </div>

      <script>
        // Notify the main workspace window that we are done
        if (window.opener) {
          window.opener.postMessage({ 
            type: 'UBENTO_AUTH_SUCCESS', 
            state: '${clientState}' 
          }, '*');
          
          // Optional: Automatically close the tab after 2 seconds
          setTimeout(() => window.close(), 2000);
        }
      </script>
    </body>
    </html>
  `);
    },
  ),
);

export default router;
