import { HttpConnectionProviderConfig } from "@ubento/vertex.core";

export function extractProviderAuthMethods(config: HttpConnectionProviderConfig) {
  const authMethods: Array<{
    code: string;
    name: string;
  }> = [];

  if (config.auth.oauth2) {
    authMethods.push({
      code: "oauth2",
      name: "OAuth",
    });
  }
  if (config.auth.apiKey) {
    authMethods.push({
      code: "api-key",
      name: "API Key",
    });
  }
  if (config.auth.basic) {
    authMethods.push({
      code: "basic",
      name: "Basic Auth",
    });
  }
  return authMethods;
}
