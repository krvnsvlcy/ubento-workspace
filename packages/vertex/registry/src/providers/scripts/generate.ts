import {
  HttpConnectionProviderConfig,
  httpConnectionProviderConfigSchema,
  HttpHandler,
} from "@ubento/vertex.core";

// --- 1. Interfaces ---

export interface NangoProviderConfig {
  display_name: string;
  auth_mode?: string;
  authorization_url?: string;
  token_url?: string;
  authorization_params?: Record<string, string>;
  default_scopes?: string[];
  disable_pkce?: boolean;
  proxy?: {
    base_url?: string;
  };
  connection_config?: Record<string, any>;
}

export type UbentoAuthType = "basic" | "oauth2" | "apiKey";

export interface GroupedNangoProvider {
  proxyUrl: string;
  auth: {
    basic?: string;
    oauth2?: string;
    apiKey?: string;
  };
}

// --- 2. Helpers ---

/**
 * Parses a flat URL string into a structured HttpHandler.
 * Safely extracts existing query parameters and merges them with explicit authorization_params.
 */
function createHttpHandler(
  fullUrl: string,
  method: "GET" | "POST",
  extraQuery?: Record<string, string>,
): HttpHandler {
  // 1. Strip out Nango's '||' fallback syntax and take the primary URL
  const cleanUrl = fullUrl.split("||")[0].trim();

  const handler: HttpHandler = {
    request: {
      method,
      path: cleanUrl,
    },
  };

  try {
    const url = new URL(cleanUrl);

    // 2. Decode the origin and path to preserve ${variables} instead of %7Bvariables%7D
    handler.request.baseUrl = decodeURI(url.origin);
    handler.request.path = decodeURI(url.pathname);

    const query: Record<string, string> = {};
    url.searchParams.forEach((val, key) => {
      query[key] = decodeURIComponent(val); // Keep queries clean too
    });

    if (extraQuery) {
      Object.assign(query, extraQuery);
    }

    if (Object.keys(query).length > 0) {
      handler.request.query = query;
    }
  } catch (e) {
    if (extraQuery && Object.keys(extraQuery).length > 0) {
      handler.request.query = extraQuery;
    }
  }

  return handler;
}
// --- 3. Pipeline Step 1: Extraction & Grouping ---

export function groupNangoProviders(
  nangoProviders: Record<string, NangoProviderConfig>,
): Record<string, GroupedNangoProvider> {
  const grouped: Record<string, GroupedNangoProvider> = {};

  for (const [originalKey, config] of Object.entries(nangoProviders)) {
    const authMode = config.auth_mode;
    let targetType: UbentoAuthType | null = null;

    if (authMode === "BASIC") {
      targetType = "basic";
    } else if (authMode === "OAUTH2") {
      targetType = "oauth2";
    } else if (authMode === "API_KEY" || authMode === "APP") {
      targetType = "apiKey";
    }

    // Skip unsupported auth modes (OAUTH1, CUSTOM, NONE)
    if (!targetType) continue;

    const proxyUrl = config.proxy?.base_url || "";

    // Normalize URL for grouping. Fallback to original key if no proxyUrl exists.
    const groupKey = proxyUrl
      ? proxyUrl.trim().toLowerCase().replace(/\/$/, "")
      : originalKey.toLowerCase();

    if (!grouped[groupKey]) {
      grouped[groupKey] = {
        proxyUrl,
        auth: {},
      };
    }

    grouped[groupKey].auth[targetType] = originalKey;
  }

  return grouped;
}

// --- 4. Pipeline Step 2: Generation & Validation ---

export function buildUbentoProviders(
  groupedMap: Record<string, GroupedNangoProvider>,
  nangoMap: Record<string, NangoProviderConfig>,
): Record<string, HttpConnectionProviderConfig> {
  const ubentoProviders: Record<string, HttpConnectionProviderConfig> = {};

  for (const [groupKey, group] of Object.entries(groupedMap)) {
    // Determine primary identity, favoring OAuth2 as the source of truth
    const primaryNangoKey =
      group.auth.oauth2 || group.auth.apiKey || group.auth.basic;
    if (!primaryNangoKey) continue;

    const primaryNangoConfig = nangoMap[primaryNangoKey];

    // Generate a safe unique code
    let code = primaryNangoConfig.display_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Collision handling
    if (ubentoProviders[code]) {
      code = `${code}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const provider: HttpConnectionProviderConfig = {
      type: "http",
      code,
      name: primaryNangoConfig.display_name,
      auth: {},
      customFields: {},
    };

    const authTypes = ["basic", "apiKey", "oauth2"] as const;

    for (const type of authTypes) {
      const targetNangoKey = group.auth[type];
      if (!targetNangoKey) continue;

      const nangoConfig = nangoMap[targetNangoKey];

      // Aggregate custom fields
      if (nangoConfig.connection_config) {
        provider.customFields = {
          ...provider.customFields,
          ...nangoConfig.connection_config,
        };
      }

      // Map strategies
      if (type === "basic") {
        provider.auth.basic = {};
      } else if (type === "apiKey") {
        provider.auth.apiKey = {
          location: "header",
          name: "Authorization",
          template: "Bearer {{key}}",
        };
      } else if (type === "oauth2") {
        if (nangoConfig.authorization_url && nangoConfig.token_url) {
          provider.auth.oauth2 = {
            type: "oauth2",
            // authorization_params injected directly into the GET request's query object
            authorize: createHttpHandler(
              nangoConfig.authorization_url,
              "GET",
              nangoConfig.authorization_params,
            ),
            // token_url is standard POST. If Nango ever adds token_params, they can be merged here too.
            token: createHttpHandler(nangoConfig.token_url, "POST"),
            defaultScopes: nangoConfig.default_scopes,
            disablePkce: nangoConfig.disable_pkce ?? false,
          };
        }
      }
    }

    // Cleanup empty customFields
    if (Object.keys(provider.customFields || {}).length === 0) {
      delete provider.customFields;
    }

    try {
      // Final schema validation before adding to the registry
      httpConnectionProviderConfigSchema.parse(provider);
      ubentoProviders[code] = provider;
    } catch (e) {
      console.error(`[Generator] Validation failed for provider ${code}:`, e);
    }
  }

  return ubentoProviders;
}
