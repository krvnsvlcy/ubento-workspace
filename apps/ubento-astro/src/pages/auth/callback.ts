import type { APIRoute } from "astro";
import { exchangeCodeForToken, setSession } from "@/lib/auth";
import { env } from "@/lib/env";
import axios from "axios";
import * as jose from "jose";

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const origin = url.origin;
  try {
    const code = url.searchParams.get("code");

    if (!code) {
      console.error("No auth code found in callback URL");
      return redirect(new URL("/?error=missing_code", origin).toString(), 302);
    }

    const token = await exchangeCodeForToken({
      code,
      redirectUrl: new URL("/api/auth/callback", origin).toString(),
    });

    const accessTokenPayload = jose.decodeJwt(token.access_token) as {
      sub: string;
      exp: number;
      teamIds: string[];
    };

    const expires_at = Math.round(Date.now() / 1000) + token.expires_in;

    type User = {
      id: string;
      email: string;
      name: string;
      picture: string;
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
      team_id: accessTokenPayload.teamIds[0],
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });

    return response;
  } catch (err: any) {
    console.error("Auth Callback Error:", err?.response?.data || err.message);
    const errorUrl = new URL("/", origin);
    errorUrl.searchParams.set("error", "authentication_failed");
    return redirect(errorUrl.toString(), 302);
  }
};

export const prerender = false;
