import { exchangeCodeForToken, setSession } from "@/lib/auth";
import { env } from "@/lib/env";
import axios from "axios";
import * as jose from "jose";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const origin = url.origin;

    if (!code) {
      console.error("No auth code found in callback URL");
      return Response.redirect(
        new URL("/?error=missing_code", origin).toString(),
      );
    }

    const token = await exchangeCodeForToken({
      code,
      redirectUrl: new URL("/api/auth/callback", origin).toString(),
    });

    const accessTokenPayload = jose.decodeJwt(token.access_token) as {
      sub: string;
      exp: number;
      teamIds?: string[];
    };

    const expires_at = Math.round(Date.now() / 1000) + token.expires_in;

    type User = {
      id: string;
      email: string | null;
      name: string | null;
      picture?: string;
      tenant_id?: string;
    };

    const { data: user } = await axios.get<User>(
      new URL("/oauth/self", env.AUTH_BASE_URL).toString(),
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    const response = new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/", origin).toString(),
      },
    });

    await setSession(response, {
      user_id: user.id,
      tenant_id:
        user.tenant_id ||
        (accessTokenPayload.teamIds && accessTokenPayload.teamIds[0]) ||
        "",
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at,
      name: user.name ?? undefined,
      picture: user.picture,
    });

    return response;
  } catch (err: any) {
    console.error("Auth Callback Error:", err?.response?.data || err.message);
    const errorUrl = new URL("/", request.url);
    errorUrl.searchParams.set("error", "authentication_failed");
    return Response.redirect(errorUrl);
  }
};

export const dynamic = "force-dynamic";
