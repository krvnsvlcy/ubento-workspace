import { ubentoApi } from "@ubento/primitives";
import { AuthorizationError, ValidationError } from "@ubento/service-toolkit";
import { env } from "../../env.js";
import { getClient } from "../management/client/client.js";
import { useClientCredential } from "../management/client/credentials.js";
import { listUserOrganizations } from "../management/organization/memberships.js";
import { consumeAuthCode } from "./code.js";
import { signAccessToken } from "./jwt.js";
import { authorizeUserScope } from "./scope.js";
import {
  getActualizedRefreshToken,
  getSession,
  getSessionByRefreshToken,
  validateSession,
} from "./session.js";

export type AccessTokenPayload = {
  sub: string;
  aud: string;
  iss: string;
  scope: string[];
  orgIds: string[];
};

export function buildAccessTokenPayload(params: {
  subject: string;
  audience: string;
  scope: string[];
  orgIds: string[];
}): AccessTokenPayload {
  return {
    sub: params.subject,
    aud: params.audience,
    iss: env.AUTH_SERVER_BASE_URL,
    scope: params.scope,
    orgIds: params.orgIds,
  };
}

export type TokenResponse = {
  token_type: "Bearer";
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

export async function getTokenWithAuthorizationCode({
  code,
  client_id,
  client_secret,
  redirect_uri,
}: {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}): Promise<TokenResponse> {
  // 1. Validate Client
  const audience = ubentoApi.audience;
  const client = await getClient(client_id);
  if (!client) {
    throw new ValidationError("Invalid client_id");
  }

  const cred = await useClientCredential({
    clientId: client_id,
    secret: client_secret,
  });
  if (!cred) {
    throw new ValidationError("Invalid client_secret");
  }

  // 2. Consume Code
  const authCode = await consumeAuthCode(code);
  if (!authCode) {
    throw new ValidationError("Code expired or already used");
  }

  // 3. Get session
  const session = await getSession(authCode.session_id);
  if (!session || !(await validateSession(session))) {
    throw new ValidationError("Invalid or expired session");
  }

  // 4. Authorize Scope
  const permissions = await authorizeUserScope({
    userId: session.user_id,
    scope: "",
    audience: [],
  });
  if (!permissions) {
    throw new AuthorizationError("Scope not authorized");
  }

  const orgs = await listUserOrganizations(session.user_id);

  // 5. Issue Access Token
  const expiresIn = 3600;
  const jwt = await signAccessToken(
    buildAccessTokenPayload({
      subject: session.user_id,
      audience,
      scope: permissions,
      orgIds: orgs.map((org) => org.id),
    }),
    { expiresIn: `${expiresIn}s` }
  );

  // 6. Get actualized refresh token
  const actualizedRefreshToken = await getActualizedRefreshToken(session.id);

  return {
    access_token: jwt,
    token_type: "Bearer",
    expires_in: expiresIn,
    refresh_token: actualizedRefreshToken,
  };
}

export async function getTokenWithRefreshToken({
  refresh_token,
}: {
  refresh_token: string;
  client_id: string;
  client_secret?: string;
  scope?: string[];
}): Promise<TokenResponse> {
  // 1. Get session by refresh token (validates existence and expiry)
  const session = await getSessionByRefreshToken(refresh_token);
  if (!session) {
    throw new ValidationError("Invalid or expired refresh token");
  }

  // 2. Rotate Refresh Token
  const newRefreshToken = await getActualizedRefreshToken(session.id);

  // 3. Issue Access Token
  const expiresIn = 3600;
  const jwt = await signAccessToken(
    {
      sub: session.user_id,
      iss: env.AUTH_SERVER_BASE_URL,
      scp: (session.metadata as any)?.scope || "",
    },
    { expiresIn: `${expiresIn}s` }
  );

  return {
    access_token: jwt,
    token_type: "Bearer",
    expires_in: expiresIn,
    refresh_token: newRefreshToken,
  };
}

export async function getTokenWithClientCredentials({
  client_id,
  client_secret,
  audience,
  scope,
}: {
  client_id: string;
  client_secret: string;
  audience?: string;
  scope?: string[];
}): Promise<TokenResponse> {
  // 1. Validate Client
  const client = await getClient(client_id);
  if (!client) {
    throw new ValidationError("Invalid client_id");
  }

  // 2. Validate Credentials
  const cred = await useClientCredential({
    clientId: client_id,
    secret: client_secret,
  });

  if (!cred) {
    throw new ValidationError("Invalid client_secret");
  }

  // 3. Issue Access Token
  const expiresIn = 3600;
  const jwt = await signAccessToken(
    {
      sub: client_id,
      aud: audience,
      iss: env.AUTH_SERVER_BASE_URL,
      scp: scope,
    },
    { expiresIn: `${expiresIn}s` }
  );

  return {
    access_token: jwt,
    token_type: "Bearer",
    expires_in: expiresIn,
  };
}
