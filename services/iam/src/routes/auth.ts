import { ubentoEntities } from "@ubento/primitives";
import { chain, validate, ValidationError } from "@ubento/service-toolkit";
import { GenericServerException } from "@workos-inc/node";
import { Response, Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { createAuthCode } from "../entities/auth/code.js";
import { getJwks, verifyAccessToken } from "../entities/auth/jwt.js";
import {
  createSession,
  getSession,
  revokeSession,
  validateSession,
} from "../entities/auth/session.js";
import {
  getTokenWithAuthorizationCode,
  getTokenWithClientCredentials,
  getTokenWithPassword,
  getTokenWithRefreshToken,
  TokenResponse,
} from "../entities/auth/token.js";
import { getClient as getClientById } from "../entities/management/client/client.js";
import { getUser, syncUserData } from "../entities/management/user.js";
import { env } from "../env.js";
import { joinUrl } from "../lib/url.js";
import { workos } from "../lib/workos.js";

const authRouter: Router = Router();

const authProviders = {
  google: "google",
  github: "github",
  apple: "apple",
  microsoft: "microsoft",
};

function getWorkOsProvider(provider: string) {
  switch (provider) {
    case authProviders.google:
      return "GoogleOAuth";
    case authProviders.github:
      return "GitHubOAuth";
    case authProviders.apple:
      return "AppleOAuth";
    case authProviders.microsoft:
      return "MicrosoftOAuth";
    default:
      throw new ValidationError(`Unsupported provider: ${provider}`);
  }
}

const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

/**
 * Generates an Authorization Code and redirects the user back to the client app.
 */
async function redirectWithCode({
  res,
  redirectUri,
  sessionId,
  clientId,
  clientState,
}: {
  res: Response;
  redirectUri: string;
  sessionId: string;
  clientId: string;
  clientState?: string;
}) {
  const code = await createAuthCode({
    sessionId,
    clientId,
  });
  const targetUrl = new URL(redirectUri);

  targetUrl.searchParams.set("code", code);
  if (clientState) {
    targetUrl.searchParams.set("state", clientState);
  }

  res.redirect(targetUrl.toString());
}

/**
 * GET /oauth/authorize
 * Initiates the flow. Checks for existing SSO session or redirects to WorkOS.
 */
authRouter.get("/oauth/authorize", async (req, res) => {
  const {
    client_id,
    redirect_uri,
    state,
    response_type = "code",
    login_hint,
    provider,
  } = req.query as any;

  if (!provider) {
    return res.status(400).send("Missing provider");
  }

  // A. Validate Client
  if (!client_id) return res.status(400).send("Missing client_id");

  // Use getClient from management entities (client.ts)
  const client = await getClientById(client_id);
  if (!client) {
    return res.status(400).send("Invalid client_id");
  }

  // Validate Redirect URI
  if (!redirect_uri || !client.redirect_uris.includes(redirect_uri)) {
    return res.status(400).send("Invalid or unauthorized redirect_uri");
  }

  if (response_type !== "code") {
    return res
      .status(400)
      .send("Unsupported response_type. Only 'code' is supported.");
  }

  // B. Check for existing SSO Session (Cookie on Auth Server)
  const sessionId = req.cookies["auth_sso_session"];
  if (sessionId) {
    const session = await getSession(sessionId);
    if (session && (await validateSession(session))) {
      // User is already logged in. Skip WorkOS.
      return await redirectWithCode({
        res,
        redirectUri: redirect_uri,
        sessionId: session.id,
        clientId: client_id,
        clientState: state,
      });
    }
  }

  // C. Not logged in: Prepare WorkOS Redirect
  const serverState = crypto.randomBytes(16).toString("hex");

  const flowContext = JSON.stringify({
    serverState,
    clientId: client_id,
    clientRedirect: redirect_uri,
    clientState: state,
  });

  res.cookie("oauth_flow_context", flowContext, {
    ...COOKIE_OPTS,
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  const url = workos.userManagement.getAuthorizationUrl({
    provider: getWorkOsProvider(provider),
    clientId: env.WORKOS_CLIENT_ID,
    redirectUri: joinUrl(env.AUTH_SERVER_BASE_URL, "/oauth/callback"),
    state: serverState,
    ...(login_hint && { loginHint: String(login_hint) }),
  });
  console.log(url);

  res.redirect(url);
});

/**
 * GET /oauth/callback
 * Handle return from WorkOS, create SSO session, and issue Code.
 */
authRouter.get("/oauth/callback", async (req, res, next) => {
  try {
    const { code, state, error, error_description } = req.query;

    const flowCookie = req.cookies["oauth_flow_context"];
    if (!flowCookie) {
      return res
        .status(400)
        .send("Session expired or invalid flow. Please try logging in again.");
    }

    const context = JSON.parse(flowCookie);
    const { clientId, clientRedirect, clientState, serverState } = context;

    res.clearCookie("oauth_flow_context");

    if (error) {
      const errorUrl = new URL(clientRedirect);
      errorUrl.searchParams.set("error", String(error_description || error));
      if (clientState) errorUrl.searchParams.set("state", clientState);
      return res.redirect(errorUrl.toString());
    }

    if (!state || state !== serverState) {
      return res.status(403).send("Invalid state parameter.");
    }

    // Authenticate with WorkOS
    let user;
    try {
      const { user: workOsUser } =
        await workos.userManagement.authenticateWithCode({
          clientId: env.WORKOS_CLIENT_ID,
          code: String(code),
        });
      user = workOsUser;
    } catch (error) {
      if (error instanceof GenericServerException) {
        if ((error.rawData as any).code === "organization_selection_required") {
          const data = error.rawData as {
            pending_authentication_token: string;
            organizations: Array<{
              id: string;
              name: string;
            }>;
            user: {
              id: string;
              email: string;
              first_name: string;
              last_name: string;
            };
          };
          const org = data.organizations[0];
          if (org) {
            const { user: workOsUser } =
              await workos.userManagement.authenticateWithOrganizationSelection(
                {
                  clientId: env.WORKOS_CLIENT_ID,
                  organizationId: org.id,
                  pendingAuthenticationToken: data.pending_authentication_token,
                  ipAddress: req.ip,
                },
              );
            user = workOsUser;
          } else {
            return res.status(400).send("No team found for user");
          }
        } else {
          return res.status(400).send("Invalid authentication");
        }
      } else {
        return res.status(500).send("Error authenticating.");
      }
    }

    // Create central session
    const dbUser = await syncUserData(user);

    // 1. Create SSO Session
    const session = await createSession({
      userId: dbUser.id,
    });

    // 2. Set SSO Cookie
    res.cookie("auth_sso_session", session.id, {
      ...COOKIE_OPTS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 3. Issue Authorization Code to requestor
    await redirectWithCode({
      res,
      redirectUri: clientRedirect,
      sessionId: session.id,
      clientId,
      clientState,
    });
  } catch (e) {
    console.error("Callback Error:", e);
    next(e);
  }
});

/**
 * POST /oauth/token
 */
authRouter.post(
  "/oauth/token",
  chain(
    validate({
      body: z.discriminatedUnion("grant_type", [
        // 1. Authorization Code Grant
        z.object({
          grant_type: z.literal("authorization_code"),
          code: z.string(),
          redirect_uri: z.url(),
          client_id: z.string(),
          client_secret: z.string(),
        }),

        // 2. Refresh Token Grant
        z.object({
          grant_type: z.literal("refresh_token"),
          refresh_token: z.string(),
          client_id: z.string(),
          client_secret: z.string(),
          scope: z.array(z.string()).optional(),
        }),

        // 3. Client Credentials Grant
        z.object({
          grant_type: z.literal("client_credentials"),
          client_id: z.string(),
          client_secret: z.string(),
          scope: z.array(z.string()).optional(),
          audience: z.string().optional(),
        }),

        // 4. Password Grant
        z.object({
          grant_type: z.literal("password"),
          email: z.string().email(),
          password: z.string(),
          client_id: z.string(),
          client_secret: z.string(),
        }),
      ]),
    }),
    async (req, res) => {
      const payload = req.body;

      let token: TokenResponse;

      try {
        if (payload.grant_type === "authorization_code") {
          token = await getTokenWithAuthorizationCode({
            code: payload.code,
            client_id: payload.client_id,
            client_secret: payload.client_secret,
            redirect_uri: payload.redirect_uri,
          });
        } else if (payload.grant_type === "refresh_token") {
          token = await getTokenWithRefreshToken({
            refresh_token: payload.refresh_token,
            client_id: payload.client_id,
            client_secret: payload.client_secret,
            scope: payload.scope,
          });
        } else if (payload.grant_type === "client_credentials") {
          token = await getTokenWithClientCredentials({
            client_id: payload.client_id,
            client_secret: payload.client_secret,
            scope: payload.scope,
            audience: payload.audience,
          });
        } else if (payload.grant_type === "password") {
          token = await getTokenWithPassword({
            email: payload.email,
            password: payload.password,
            client_id: payload.client_id,
            client_secret: payload.client_secret,
          });
        } else {
          return res.status(400).json({ error: "unsupported_grant_type" });
        }
      } catch (e) {
        console.error("Token Error:", e);

        if (e instanceof GenericServerException) {
          const rawData = e.rawData as any;
          return res.status(e.status || 400).json({
            error: rawData.code || "workos_error",
            error_description: rawData.message || e.message,
            ...rawData,
          });
        }

        if (e instanceof ValidationError) {
          return res.status(400).json({
            error: "invalid_request",
            error_description: e.message,
          });
        }

        return res.status(500).json({ error: "server_error" });
      }

      res.json(token);
    },
  ),
);

/**
 * GET /oauth/self
 * Returns information about the authenticated subject
 */
authRouter.get("/oauth/self", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verifyAccessToken({ token });
    const sub = payload.sub;

    if (!sub) {
      return res.status(401).send("Invalid token: missing subject");
    }

    if (sub.startsWith(ubentoEntities.user.code)) {
      const user = await getUser(sub);
      if (user) {
        return res.json(user);
      }
    } else if (sub.startsWith(ubentoEntities.client.code)) {
      const client = await getClientById(sub);
      if (client) {
        return res.json(client);
      }
    }

    return res.status(404).send("Subject not found");
  } catch (e) {
    console.error("Token Verification Error:", e);
    return res.status(401).send("Invalid token");
  }
});

/**
 * GET /jwks
 */
authRouter.get("/jwks", async (req, res) => {
  const jwks = await getJwks();
  res.set("Cache-Control", "public, max-age=3600");
  res.json(jwks);
});

/**
 * GET /oauth/logout
 * Clears the SSO session and redirects back.
 */
authRouter.get("/oauth/logout", async (req, res) => {
  const { redirect_uri } = req.query;

  const sessionId = req.cookies["auth_sso_session"];
  if (sessionId) {
    try {
      await revokeSession(sessionId);
    } catch (e) {
      // Ignore if session not found or already revoked
    }
  }

  res.clearCookie("auth_sso_session", COOKIE_OPTS);

  if (redirect_uri) {
    return res.redirect(String(redirect_uri));
  }

  res.send("Logged out");
});

export default authRouter;
