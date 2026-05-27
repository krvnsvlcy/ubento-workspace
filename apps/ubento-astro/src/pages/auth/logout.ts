import type { APIRoute } from "astro";
import { destroySession } from "@/lib/auth";
import { env } from "@/lib/env";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const origin = url.origin;

  // Redirect to server logout with app origin as redirect_uri
  const serverLogoutUrl = new URL(`${env.AUTH_BASE_URL}/oauth/logout`);
  serverLogoutUrl.searchParams.set("redirect_uri", origin);

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: serverLogoutUrl.toString(),
    },
  });

  // Clear local session cookies
  await destroySession(response);

  return response;
};

export const prerender = false;
