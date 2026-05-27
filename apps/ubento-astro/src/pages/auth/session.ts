import type { APIRoute } from "astro";
import { getAccessToken } from "@/lib/auth";

export const GET: APIRoute = async ({ request }) => {
  try {
    const accessToken = await getAccessToken(request);
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "No access token" }), {
        status: 401,
        statusText: "Unauthorized",
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(accessToken), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve access token" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

export const prerender = false;
