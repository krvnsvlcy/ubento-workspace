import { resolveObject } from "../resolve";
import { HttpBody, HttpBodyType, HttpHandler } from "../spec/spec";

export type RunHttpHandlerErrorCode =
  | "UNSUPPORTED_HANDLER_TYPE"
  | "INVALID_REQUEST_ERROR"
  | "UPSTREAM_ERROR";

export type RunHttpHandlerError = {
  code: RunHttpHandlerErrorCode;
  message: string;
  details?: unknown;
};

export type RunHttpHandlerResult<T = unknown> =
  | { url?: string; data: T; error: null; status?: number }
  | { url?: string; data: null; error: RunHttpHandlerError; status?: number };

export async function runHttpHandler<T>({
  baseUrl,
  handler,
  context,
  interceptRequest = (r) => r,
  interceptResponse = (r) => r,
}: {
  baseUrl?: string;
  handler: HttpHandler;
  context: Record<string, unknown>;
  interceptRequest?: (req: Request) => Request | Promise<Request>;
  interceptResponse?: (res: Response) => Response | Promise<Response>;
}): Promise<RunHttpHandlerResult<T>> {
  const request = resolveObject(handler.request, context);
  const path = resolvePath(request.path, request.params);

  const finalBaseUrl = baseUrl ?? request.baseUrl;
  if (!finalBaseUrl) {
    return {
      data: null,
      error: {
        code: "INVALID_REQUEST_ERROR",
        message: `At least one of baseUrl or handler.request.baseUrl must be provided`,
      },
    };
  }

  const url = buildRequestUrl(path, finalBaseUrl, request.query);
  const headers = buildRequestHeaders(request.headers);
  const bodyData = buildBody(request.body, headers);

  let response: Response;
  try {
    let req = new Request(url.toString(), {
      method: request.method,
      headers,
      body: bodyData,
    });
    req = await interceptRequest(req);
    response = await fetch(req);
    response = await interceptResponse(response);
  } catch (err) {
    console.error({ err, handler, context, baseUrl, path, headers });
    const errorMessage =
      err instanceof Error ? err.message : "Unknown network error";
    return {
      url: url.toString(),
      data: null,
      error: {
        code: "UPSTREAM_ERROR",
        message: `Network request failed: ${errorMessage}`,
      },
    };
  }

  const data = await parseBody(response, handler.response?.type);
  if (!response.ok) {
    return {
      url: url.toString(),
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

  const resolvedResponse = handler.response?.data
    ? resolveObject(handler.response.data, {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      })
    : data;

  return {
    url: url.toString(),
    status: response.status,
    data: resolvedResponse as T,
    error: null,
  };
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
  baseUrl: string,
  query?: Record<string, unknown>,
): URL {
  const url = new URL(path, baseUrl);

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
): Headers {
  const headers = new Headers();

  if (handlerHeaders) {
    for (const [key, val] of Object.entries(handlerHeaders)) {
      if (val !== undefined && val !== null) headers.set(key, String(val));
    }
  }

  return headers;
}

export function buildBody(
  handlerBody: HttpBody | undefined,
  headers: Headers,
): BodyInit | undefined {
  if (!handlerBody || handlerBody.data === undefined) {
    return undefined;
  }

  // The standard Headers API is automatically case-insensitive
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
      const params = new URLSearchParams();
      if (typeof handlerBody.data === "object" && handlerBody.data !== null) {
        for (const [key, val] of Object.entries(handlerBody.data)) {
          if (val !== undefined && val !== null) {
            params.append(key, String(val));
          }
        }
      }
      return params.toString();

    case "text":
      if (!hasContentType) {
        headers.set("Content-Type", "text/plain");
      }
      return String(handlerBody.data);

    case "bytes":
      if (!hasContentType) {
        headers.set("Content-Type", "application/octet-stream");
      }
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
