import type { APIRoute } from "astro";
import { getAccessToken } from "@/lib/auth";
import axios from "axios";

const API_BASE_URL =
  process.env.UBENTO_API_BASE_URL || "https://api.ubento.pro";

let SERVICE_OVERRIDE_URLS: Record<string, string> = {};
try {
  SERVICE_OVERRIDE_URLS = JSON.parse(process.env.UBENTO_SERVICE_URLS || "{}");
} catch (e) {
  console.error("Failed to parse UBENTO_SERVICE_URLS", e);
}

const handle: APIRoute = async ({ request, url }) => {
  const token = await getAccessToken(request);
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const serviceName = request.headers.get("x-ubento-service");

  // Extract path from the URL by stripping the prefix
  const prefix = "/proxy/ubento";
  let path = url.pathname;
  if (path.startsWith(prefix)) {
    path = path.slice(prefix.length);
  }
  if (!path) path = "/";

  let targetBaseUrl = API_BASE_URL;
  if (serviceName && SERVICE_OVERRIDE_URLS[serviceName]) {
    targetBaseUrl = SERVICE_OVERRIDE_URLS[serviceName];
  }

  const targetUrl = `${targetBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  try {
    // Forward all query parameters exactly as they are received
    const queryString = url.searchParams.toString();
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

    const body =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.json().catch(() => undefined)
        : undefined;

    const response = await axios({
      method: request.method,
      url: finalUrl,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ubento-team-id": request.headers.get("ubento-team-id") || "",
      },
      validateStatus: () => true,
    });

    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(`Proxy error:`, error.message);
    return new Response(JSON.stringify({ error: "Proxy connection failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const ALL = handle;
export const prerender = false;
