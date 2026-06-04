import {
  HttpConnectionCredentials,
  HttpConnectionProviderConfig,
  HttpConnectionSpec,
  HttpHandler,
} from "@ubento/vertex.core";
import {
  runHttpHandler,
  RunHttpHandlerError,
  RunHttpHandlerResult,
} from "./run.js";

export async function invokeHttpService({
  handler,
  connection,
  args,
}: {
  handler: HttpHandler;
  connection?: {
    spec: HttpConnectionSpec;
    provider: HttpConnectionProviderConfig;
    credentials: HttpConnectionCredentials;
  };
  args: Record<string, unknown>;
}): Promise<RunHttpHandlerResult> {
  // 1. Construct the Global Execution Context
  const context = {
    args: args || {},
    credentials: connection?.credentials || {},
  };

  // 2. Pre-merge Headers and Query strings to prepare for authentication
  const requestHeaders: Record<string, unknown> = {
    ...(connection?.spec?.headers || {}),
    ...(handler.request.headers || {}),
  };

  const requestQuery: Record<string, unknown> = {
    ...(handler.request.query || {}),
  };

  // 3. Inject Authentication (Modifies requestHeaders and requestQuery by reference)
  const authError = applyCredentials(requestHeaders, requestQuery, connection);
  if (authError) {
    return { data: null, error: authError };
  }

  // 4. Delegate to the core engine runner
  return runHttpHandler({
    baseUrl: connection?.spec.baseUrl,
    handler: {
      ...handler,
      request: {
        ...handler.request,
        headers: requestHeaders,
        query: requestQuery,
      },
    },
    context,
  });
}

export function applyCredentials(
  headers: Record<string, unknown>,
  query: Record<string, unknown>,
  connection?: {
    provider: HttpConnectionProviderConfig;
    credentials: HttpConnectionCredentials;
  },
): RunHttpHandlerError | null {
  if (!connection?.credentials) {
    return null;
  }

  switch (connection.credentials.type) {
    case "oauth2":
      headers["Authorization"] =
        `Bearer ${(connection.credentials as any).accessToken || (connection.credentials as any).access_token}`;
      break;

    case "basic":
      const credentials = Buffer.from(
        `${connection.credentials.username}:${connection.credentials.password}`,
      ).toString("base64");
      headers["Authorization"] = `Basic ${credentials}`;
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
        headers[strategy.name] = tokenValue;
      } else if (strategy.location === "query") {
        query[strategy.name] = tokenValue;
      }
      break;
    }
  }

  return null;
}
