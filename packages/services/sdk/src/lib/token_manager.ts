import axios from "axios";

export type TokenManager = {
  getToken: () => Promise<string>;
};

/**
 * Client Credentials Grant Token Manager
 *
 * Best used for machine-to-machine auth (no user context).
 */
export function createClientCredentialsTokenManager({
  issuerUrl,
  clientId,
  clientSecret,
  audience,
  endpoint,
}: {
  issuerUrl: string;
  clientId: string;
  clientSecret: string;
  audience?: string;
  endpoint?: string;
}): TokenManager {
  let token: string | undefined;
  let expiresIn: number | undefined;
  let expiresAt: number | undefined;
  let tokenType: string | undefined;

  const auth0Client = axios.create({ baseURL: issuerUrl });

  async function _getToken() {
    const tokenResponse = await auth0Client.post(
      endpoint || "/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        ...(audience ? { audience } : {}),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    token = tokenResponse.data.access_token;
    expiresIn = tokenResponse.data.expires_in;
    expiresAt = Date.now() / 1000 + (expiresIn || 1);
    tokenType = tokenResponse.data.token_type;
  }

  async function getToken(): Promise<string> {
    const now = Date.now() / 1000;
    if (
      !token ||
      !expiresAt ||
      !tokenType ||
      now > expiresAt - (expiresIn || 1) / 24
    ) {
      await _getToken();
    }
    return token!;
  }

  return { getToken };
}

/**
 * Refresh Token Token Manager
 *
 * Best used for long-lived sessions with refresh flow.
 */
export function createRefreshTokenTokenManager({
  issuerUrl,
  clientId,
  clientSecret,
  accessToken,
  refreshToken,
  expiresIn,
  endpoint,
}: {
  issuerUrl: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  endpoint?: string;
}): TokenManager {
  let token = accessToken;
  let currentRefreshToken = refreshToken;
  let currentExpiresIn = expiresIn;
  let expiresAt = Date.now() / 1000 + (currentExpiresIn || 1);

  const auth0Client = axios.create({ baseURL: issuerUrl });

  async function _refreshToken() {
    const tokenResponse = await auth0Client.post(
      endpoint || "/oauth/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: currentRefreshToken!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    token = tokenResponse.data.access_token;
    currentExpiresIn = tokenResponse.data.expires_in;
    expiresAt = Date.now() / 1000 + (currentExpiresIn || 1);
  }

  async function getToken(): Promise<string> {
    const now = Date.now() / 1000;

    if (!currentRefreshToken) return token;
    if (
      !token ||
      !expiresAt ||
      now > expiresAt - (currentExpiresIn || 1) / 24
    ) {
      await _refreshToken();
    }

    return token!;
  }

  return { getToken };
}
