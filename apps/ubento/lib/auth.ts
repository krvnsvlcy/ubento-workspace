import { env } from "@/lib/env";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  decrypt,
  encrypt,
} from "@/lib/security";
import axios from "axios";
import * as jose from "jose";

// --- Helpers for Web standard Cookie parsing ---

export function parseCookies(request: Request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  return Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    }),
  );
}

export function serializeCookie(
  name: string,
  value: string,
  options: any = {},
) {
  let str = `${name}=${value}; Path=${options.path || "/"}`;
  if (options.httpOnly) str += "; HttpOnly";
  if (options.secure) str += "; Secure";
  if (options.sameSite) str += `; SameSite=${options.sameSite}`;
  if (options.maxAge) str += `; Max-Age=${options.maxAge}`;
  return str;
}

// --- Session Logic ---

export type Session = {
  user_id: string;
  tenant_id: string;
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  name?: string;
  picture?: string;
};

const sessionKey = env.SESSION_KEY || "ubento-session";
const sessionSecret = env.SECRET!;

if (!sessionSecret) {
  throw new Error("SECRET missing.");
}

/**
 * Sets an encrypted session cookie.
 */
export async function setSession(response: Response, session: Session) {
  const value = JSON.stringify(session);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const { encryptedData, salt } = await encrypt(value, sessionSecret, iv);

  const ivBase64 = arrayBufferToBase64(iv.buffer);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };

  response.headers.append(
    "Set-Cookie",
    serializeCookie(sessionKey, encryptedData, cookieOptions),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(`${sessionKey}-iv`, ivBase64, cookieOptions),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(`${sessionKey}-salt`, salt, cookieOptions),
  );
}

/**
 * Clears the session cookies by setting them to expire immediately.
 */
export async function destroySession(response: Response) {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 0,
  };

  response.headers.append(
    "Set-Cookie",
    serializeCookie(sessionKey, "", cookieOptions),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(`${sessionKey}-iv`, "", cookieOptions),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(`${sessionKey}-salt`, "", cookieOptions),
  );
}

/**
 * Retrieves and decrypts the session from the Request headers
 */
export async function getSession(request: Request) {
  const cookies = parseCookies(request);

  const encryptedDataBase64 = cookies[sessionKey];
  const ivBase64 = cookies[`${sessionKey}-iv`];
  const saltBase64 = cookies[`${sessionKey}-salt`];

  if (!encryptedDataBase64 || !ivBase64 || !saltBase64) {
    return undefined;
  }

  const iv = new Uint8Array(base64ToArrayBuffer(ivBase64));

  try {
    const decrypted = await decrypt(
      encryptedDataBase64,
      sessionSecret,
      iv,
      saltBase64,
    );
    const session = JSON.parse(decrypted) as Session;
    const expdate = session.expires_at * 1000;

    if (expdate < Date.now()) {
      return undefined;
    }

    return session;
  } catch (err) {
    console.error("Failed to decrypt session:", err);
    return undefined;
  }
}

// --- API Logic ---

export async function exchangeCodeForToken({
  code,
  redirectUrl,
}: {
  code: string;
  redirectUrl: string;
}) {
  try {
    const { data } = await axios.post<{
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token?: string;
    }>(new URL("/oauth/token", env.AUTH_BASE_URL).toString(), {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
    });
    return data;
  } catch (err: any) {
    console.error(
      "Failed to exchange code for token:",
      err.response?.data || err.message,
    );
    throw new Error("Token exchange failed");
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const { data } = await axios.post<{
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token?: string;
    }>(new URL("/oauth/token", env.AUTH_BASE_URL).toString(), {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
    });
    return data;
  } catch (err: any) {
    console.error(
      "Failed to refresh access token:",
      err.response?.data || err.message,
    );
    throw new Error("Token refresh failed");
  }
}

export async function getAccessToken(request: Request, response?: Response) {
  const session = await getSession(request);

  if (!session) return undefined;

  if (session.expires_at * 1000 > Date.now()) {
    return session.access_token;
  } else if (!session.refresh_token) {
    return undefined;
  } else {
    try {
      const data = await refreshAccessToken(session.refresh_token);
      const tokenData = jose.decodeJwt(data.access_token) as { exp: number };

      const newSession: Session = {
        ...session,
        access_token: data.access_token,
        expires_at: tokenData.exp,
      };

      if (response) {
        await setSession(response, newSession);
      }

      return newSession.access_token;
    } catch (err) {
      console.error("Failed to refresh access token:", err);
      return undefined;
    }
  }
}
