import { getAccessToken } from "@/lib/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.UBENTO_API_BASE_URL || "https://api.ubento.pro";

let SERVICE_OVERRIDE_URLS: Record<string, string> = {};
try {
  SERVICE_OVERRIDE_URLS = JSON.parse(process.env.UBENTO_SERVICE_URLS || "{}");
} catch (e) {
  console.error("Failed to parse UBENTO_SERVICE_URLS", e);
}

async function handle(req: NextRequest) {
  const token = await getAccessToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceName = req.headers.get("x-ubento-service");

  // Extract path from the URL by stripping the Next.js API prefix
  const prefix = "/proxy/ubento";
  let path = req.nextUrl.pathname;
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
    const queryString = req.nextUrl.searchParams.toString();
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.json().catch(() => undefined)
        : undefined;

    const response = await axios({
      method: req.method,
      url: finalUrl,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ubento-team-id": req.headers.get("ubento-team-id") || "",
      },
      validateStatus: () => true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(`Proxy error:`, error.message);
    return NextResponse.json(
      { error: "Proxy connection failed" },
      { status: 502 },
    );
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
