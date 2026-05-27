import type { APIRoute } from "astro";
import { env } from "@/lib/env";

export const GET: APIRoute = async ({ request, redirect }) => {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  const authUrl = new URL(`${env.AUTH_BASE_URL}/oauth/authorize`);
  authUrl.searchParams.set("client_id", env.CLIENT_ID);
  authUrl.searchParams.set(
    "redirect_uri",
    new URL("/auth/callback", origin).toString(),
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("provider", "google");
  authUrl.searchParams.set("state", Math.random().toString(36).substring(7));

  return redirect(authUrl.toString(), 302);
};

export const prerender = false;
