import {
  ConnectionCredentials,
  ConnectionProviderConfig,
} from "../connection/connections";
import { resolveObject } from "../resolve.js";
import {
  HttpBody,
  HttpBodyType,
  HttpConnectionSpec,
  HttpHandler,
} from "../spec/spec";
import { InvokeError, InvokeResult } from "./invoke.js";

export async function invokeHttpService({
  handler,
  connection,
  args,
}: {
  handler: HttpHandler;
  connection?: {
    spec: HttpConnectionSpec;
    provider: ConnectionProviderConfig;
    credentials: ConnectionCredentials;
  };
  args: Record<string, unknown>;
}): Promise<InvokeResult> {
  // 1. Construct the Global Execution Context
  const context = {
    args: args || {},
    credentials: connection?.credentials || {},
  };

  const request = resolveObject(handler.request, context);

  // 2. Resolve Path Parameters
  const path = resolvePath(request.path, request.params);

  // 3. Construct URL & Resolve Query Parameters
  const url = buildRequestUrl(
    path,
    request.baseUrl || connection?.spec.baseUrl,
    request.query,
  );

  // 4. Resolve Headers
  const headers = buildRequestHeaders(
    request.headers,
    connection?.spec.headers,
  );

  // 5. Inject Authentication
  const authError = applyCredentials(headers, url, connection);
  if (authError) {
    return { data: null, error: authError };
  }

  // 6. Resolve Body
  const bodyData = buildBody(request.body, headers);

  console.log({ url: url.toString(), bodyData, request });

  // 7. Execute Upstream Request
  const response = await fetch(url.toString(), {
    method: request.method,
    headers,
    body: bodyData,
  });

  // 8. Handle Empty Responses
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return { data: null, error: null };
  }

  // 9. Parse Upstream JSON
  const data = await parseBody(response, handler.response?.type);

  if (!response.ok) {
    return {
      data: null,
      error: {
        code: "UPSTREAM_ERROR",
        message: `Upstream service returned ${response.status} ${response.statusText}`,
        details: {
          status: response.status,
          url: url.toString(),
          response: data,
        },
      },
    };
  }

  const responseContext = {
    data,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  };

  const resolvedResponse = handler.response?.data
    ? resolveObject(handler.response.data, responseContext)
    : data;

  return { data: resolvedResponse, error: null };
}

export function resolvePath(
  path: string,
  params?: Record<string, unknown>,
): string {
  let resolvedPath = path;
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined && val !== null) {
        resolvedPath = resolvedPath.replace(`{${key}}`, String(val));
      }
    }
  }
  return resolvedPath;
}

export function buildRequestUrl(
  path: string,
  baseUrl: string | undefined,
  query?: Record<string, unknown>,
): URL {
  // Prevent fatal crash if baseUrl is undefined and path is relative
  const url = baseUrl ? new URL(path, baseUrl) : new URL(path);

  if (query) {
    for (const [key, val] of Object.entries(query)) {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    }
  }
  return url;
}

export function buildRequestHeaders(
  handlerHeaders?: Record<string, unknown>,
  providerHeaders?: Record<string, unknown>,
): Headers {
  const headers = new Headers();

  if (providerHeaders) {
    for (const [key, val] of Object.entries(providerHeaders)) {
      if (val !== undefined && val !== null) headers.set(key, String(val));
    }
  }

  if (handlerHeaders) {
    for (const [key, val] of Object.entries(handlerHeaders)) {
      if (val !== undefined && val !== null) headers.set(key, String(val));
    }
  }

  return headers;
}

export function applyCredentials(
  headers: Headers,
  url: URL,
  connection?: {
    provider: ConnectionProviderConfig;
    credentials: ConnectionCredentials;
  },
): InvokeError | null {
  if (!connection?.credentials) {
    return null;
  }

  switch (connection.credentials.type) {
    case "oauth2":
      headers.set(
        "Authorization",
        `Bearer ${(connection.credentials as any).accessToken || (connection.credentials as any).access_token}`,
      );
      break;

    case "basic":
      const credentials = Buffer.from(
        `${connection.credentials.username}:${connection.credentials.password}`,
      ).toString("base64");
      headers.set("Authorization", `Basic ${credentials}`);
      break;

    case "api_key": {
      const strategy = connection.provider.auth?.apiKey;
      if (!strategy) {
        return {
          code: "INVALID_REQUEST_ERROR",
          message:
            "API Key strategy is missing from the provider configuration.",
        };
      }

      const tokenValue = strategy.template
        ? strategy.template.replace("{{key}}", connection.credentials.token)
        : connection.credentials.token;

      if (strategy.location === "header") {
        headers.set(strategy.name, tokenValue);
      } else if (strategy.location === "query") {
        url.searchParams.append(strategy.name, tokenValue);
      }
      break;
    }
  }

  return null;
}

export function buildBody(
  handlerBody: HttpBody | undefined,
  headers: Headers,
): BodyInit | undefined {
  if (!handlerBody || handlerBody.data === undefined) {
    return undefined;
  }

  // Note: The standard Headers API is automatically case-insensitive,
  // so headers.has("Content-Type") covers "content-type" as well.
  const hasContentType = headers.has("Content-Type");

  switch (handlerBody.type) {
    case "json":
      if (!hasContentType) {
        headers.set("Content-Type", "application/json");
      }
      return typeof handlerBody.data === "string"
        ? handlerBody.data
        : JSON.stringify(handlerBody.data);

    case "form":
      if (!hasContentType) {
        headers.set("Content-Type", "application/x-www-form-urlencoded");
      }
      // Assuming form data is passed as an object/record
      return new URLSearchParams(
        handlerBody.data as Record<string, string>,
      ).toString();

    case "text":
      if (!hasContentType) {
        headers.set("Content-Type", "text/plain");
      }
      return String(handlerBody.data);

    case "bytes":
      if (!hasContentType) {
        headers.set("Content-Type", "application/octet-stream");
      }
      // Fetch's BodyInit natively accepts ArrayBuffer, TypedArray, DataView, Blob, etc.
      return handlerBody.data as BodyInit;

    default:
      return undefined;
  }
}

export async function parseBody(
  response: Response,
  expectedType?: HttpBodyType,
): Promise<unknown> {
  // 1. Handle empty responses (204 No Content, or 0 length) immediately
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  // 2. If the spec explicitly demands a type, trust the spec over the headers
  if (expectedType === "json") return response.json().catch(() => null);
  if (expectedType === "text") return response.text();
  if (expectedType === "bytes") return response.arrayBuffer();

  // 3. "Auto" Mode: Infer the parsing strategy from the response headers
  const contentType = (
    response.headers.get("content-type") || ""
  ).toLowerCase();

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    if (
      contentType.includes("text/") ||
      contentType.includes("application/xml") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      return await response.text();
    }

    // Default to raw bytes (ArrayBuffer) for images, PDFs, binary streams, etc.
    return await response.arrayBuffer();
  } catch (error) {
    // Ultimate fallback: If the provider said "application/json" but returned malformed text
    try {
      return await response.text();
    } catch {
      return null;
    }
  }
}
