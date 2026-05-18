// 1. Input Interface (Nango)
interface NangoProviderConfig {
  auth_mode?: string;
  authorization_url?: string;
  proxy?: {
    base_url?: string;
  };
  // (Other fields are ignored in this specific step)
}

// 2. Output Interfaces
export type UbentoAuthType = "basic" | "oauth2" | "apiKey";

export interface GroupedNangoProvider {
  proxyUrl: string;
  allProxyUrls: string[];
  auth: {
    basic?: string;
    oauth2?: string;
    apiKey?: string;
  };
}

// 3. The Extraction & Grouping Function
export function groupNangoProviders(
  nangoProviders: Record<string, NangoProviderConfig>,
): Record<string, GroupedNangoProvider> {
  const grouped: Record<string, GroupedNangoProvider> = {};

  for (const [originalKey, config] of Object.entries(nangoProviders)) {
    // 1. Identify and filter by supported auth modes
    const authMode = config.auth_mode;
    let targetType: UbentoAuthType | null = null;

    if (authMode === "BASIC") {
      targetType = "basic";
    } else if (authMode === "OAUTH2") {
      targetType = "oauth2";
    } else if (authMode === "API_KEY" || authMode === "APP") {
      // Nango treats APP and API_KEY similarly for token injection
      targetType = "apiKey";
    }

    // Skip providers that use OAUTH1, CUSTOM, NONE, etc.
    if (!targetType) continue;

    // 2. Extract the proxy URL to use as the grouping identifier
    const proxyUrl = config.proxy?.base_url || "";

    // Normalize the URL for grouping (lowercase, remove trailing slashes).
    // If the API has no proxyUrl defined, fallback to its original key to prevent dropping it.
    const groupKey = originalKey
      .replace("-api-key", "")
      .replace("-oauth", "")
      .replace("-basic", "")
      .replace("-basic-auth", "");

    // 3. Initialize the group if it doesn't exist yet
    if (!grouped[groupKey]) {
      grouped[groupKey] = {
        proxyUrl, // Store the raw URL for later use
        allProxyUrls: [proxyUrl],
        auth: {},
      };
    } else {
      grouped[groupKey].allProxyUrls.push(proxyUrl);
    }

    // 4. Register the original Nango key under the mapped auth type
    // Example: { basic: "stripe", apiKey: "stripe-key" }
    grouped[groupKey].auth[targetType] = originalKey;
  }

  return grouped;
}
