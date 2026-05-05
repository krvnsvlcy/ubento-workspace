import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@ubento/services.toolkit";
import { Request, Response, Router } from "express";
import { IncomingHttpHeaders } from "node:http";
import { pipeline } from "node:stream/promises";
import { getOrganizationConnectionWithAuth } from "../entities/connection.js";
import { connectionProviderConfigSchema } from "../entities/connection_provider.js";

/**
 * Helper to dynamically inject CORS headers into the Express response.
 * Safely reflects the origin and merges upstream exposed headers.
 */
function injectCorsHeaders(
  req: Request,
  res: Response,
  corsConfig: any,
  upstreamExpose: string = "",
) {
  const requestOrigin = req.headers.origin || "*";

  // 1. Dynamic Origin Reflection
  if (corsConfig.allowedOrigins?.includes("*")) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  } else if (corsConfig.allowedOrigins?.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  }

  // Set Allowed Methods & Headers
  if (corsConfig.allowedMethods?.length) {
    res.setHeader(
      "Access-Control-Allow-Methods",
      corsConfig.allowedMethods.join(", "),
    );
  }
  if (corsConfig.allowedHeaders?.length) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      corsConfig.allowedHeaders.join(", "),
    );
  }

  // Set Credentials & Max Age
  if (corsConfig.credentials) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (corsConfig.maxAge !== undefined) {
    res.setHeader("Access-Control-Max-Age", String(corsConfig.maxAge));
  }

  // 2. Intelligently merge the Exposed Headers
  const configuredExpose = corsConfig.exposedHeaders?.join(", ") || "";
  const combinedExpose = [configuredExpose, upstreamExpose]
    .filter(Boolean)
    .join(", ");

  if (combinedExpose) {
    res.setHeader("Access-Control-Expose-Headers", combinedExpose);
  }
}

/**
 * Executes the request and returns the raw Fetch Response object,
 * alongside the CORS config and preflight status.
 */
export async function proxyConnectionRequest({
  provider_id,
  organization_id,
  method = "GET",
  path = "",
  headers: requestHeaders = {},
  body,
}: {
  provider_id: string;
  organization_id: string;
  method?: string;
  path?: string;
  headers?: IncomingHttpHeaders;
  body?: any;
}) {
  const connection = await getOrganizationConnectionWithAuth(
    provider_id,
    organization_id,
  );
  if (!connection)
    throw new NotFoundError(`connection ${provider_id}@${organization_id}`);

  const provider = connection.provider;
  const config = connectionProviderConfigSchema.parse(provider.config);

  // If this is an OPTIONS preflight request and CORS is configured, intercept it.
  if (method === "OPTIONS" && config.cors) {
    return { isPreflight: true, corsConfig: config.cors };
  }

  const targetUrl = requestHeaders["x-target-url"] as string;
  if (!targetUrl) throw new ValidationError("x-target-url header is required");

  const targetOrigin = new URL(targetUrl).origin;
  if (config.allowedOrigins && !config.allowedOrigins.includes(targetOrigin)) {
    throw new AuthorizationError("Target origin is not allowed");
  }

  const baseUrl = targetUrl.endsWith("/") ? targetUrl : `${targetUrl}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `${baseUrl}${cleanPath}`;

  const finalHeaders = new Headers();

  // 1. Add static config headers first
  if (config.headers) {
    for (const [key, value] of Object.entries(config.headers)) {
      if (value) finalHeaders.set(key, String(value));
    }
  }

  // 2. Safely forward client headers using an Allowlist, but explicitly strip browser contexts
  const allowedHeaders = new Set(
    (config.allowedHeaders || []).map((h) => h.toLowerCase()),
  );

  const blockedBrowserHeaders = ["host", "x-target-url", "origin", "referer"];

  for (const [key, value] of Object.entries(requestHeaders)) {
    const lowerKey = key.toLowerCase();

    // Explicitly drop headers that make this look like a browser request to upstream WAFs
    if (blockedBrowserHeaders.includes(lowerKey)) continue;
    if (!allowedHeaders.has(lowerKey)) continue;
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      finalHeaders.append(key, value.join(", "));
    } else {
      finalHeaders.append(key, String(value));
    }
  }

  // 3. Inject Authentication (Overrides everything else)
  if (connection.auth) {
    const auth = connection.auth;

    switch (auth.type) {
      case "oauth2":
        finalHeaders.set("Authorization", `Bearer ${auth.access_token}`);
        break;
      case "token": {
        const strategy = config.authStrategies?.find((s) => s.type === "token");
        if (!strategy) throw new Error(`Token strategy not found`);
        const value = strategy.template
          ? strategy.template.replace("{{token}}", auth.token)
          : auth.token;
        if (strategy.header) {
          finalHeaders.set(strategy.header, value);
        } else {
          finalHeaders.set("Authorization", value);
        }
        break;
      }
    }
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body,
    // @ts-expect-error - 'duplex' is required for streaming bodies in Node fetch
    duplex: body ? "half" : undefined,
  });

  console.log(`Proxied ${method} ${url} ${response.status}`);

  return { response, corsConfig: config.cors, isPreflight: false };
}

export const proxyRouter: Router = Router();

proxyRouter.all(
  "/integration/connection-providers/:provider_id/proxies/:organization_id{/*path}",
  async (req, res) => {
    try {
      const provider_id = (req.params as any).provider_id;
      const organization_id = (req.params as any).organization_id;
      const pathParam = ((req.params as any).path || []) as string[];
      const path = Array.isArray(pathParam) ? pathParam.join("/") : pathParam;

      let requestBody: any = undefined;
      if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        if (req.body && Object.keys(req.body).length > 0) {
          requestBody = JSON.stringify(req.body);
        } else {
          requestBody = req;
        }
      }

      const proxyResult = await proxyConnectionRequest({
        provider_id,
        organization_id,
        method: req.method,
        path,
        headers: {
          ...req.headers,
          "x-requested-with": "elll-proxy",
        } as IncomingHttpHeaders,
        body: requestBody,
      });

      // Handle intercepted preflight requests immediately
      if (proxyResult.isPreflight) {
        injectCorsHeaders(req, res, proxyResult.corsConfig);
        return res.status(204).end();
      }

      const { response, corsConfig } = proxyResult;

      // Grab the upstream expose headers before we strip the rest of the CORS headers
      const upstreamExpose =
        response!.headers.get("access-control-expose-headers") || "";

      // 1. Forward the status code
      res.status(response!.status);

      // 2. Forward response headers (excluding encoding and upstream CORS headers)
      response!.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        const isEncodingHeader = [
          "content-encoding",
          "transfer-encoding",
        ].includes(lowerKey);
        const isCorsHeader = lowerKey.startsWith("access-control-");

        if (!isEncodingHeader && !isCorsHeader) {
          res.setHeader(key, value);
        }
      });

      // 3. Inject our own dynamic CORS headers, passing the upstreamExpose to be merged
      if (corsConfig) {
        injectCorsHeaders(req, res, corsConfig, upstreamExpose);
      }

      // 4. Pipe the body directly to the client
      if (response!.body) {
        await pipeline(response!.body as any, res);
      } else {
        res.end();
      }
    } catch (error: any) {
      console.error("Proxy Error:", error);
      if (!res.headersSent) {
        res.status(error.status || 500).json({ error: error.message });
      } else {
        res.destroy();
      }
    }
  },
);
