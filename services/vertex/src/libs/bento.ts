import {
  createClientCredentialsTokenManager,
  UbentoSDK,
} from "@ubento/services.sdk";
import { env } from "../env.js";

let serviceBaseUrls: Record<string, string> = {};
if (env.UBENTO_SERVICE_BASE_URLS) {
  try {
    serviceBaseUrls = JSON.parse(env.UBENTO_SERVICE_BASE_URLS);
  } catch (error) {
    console.error("Failed to parse UBENTO_SERVICE_BASE_URLS", error);
  }
}

export const ubento = new UbentoSDK({
  tokenManager: createClientCredentialsTokenManager({
    issuerUrl: env.UBENTO_AUTH_SERVER_URL,
    clientId: env.UBENTO_SERVICES_CLIENT_ID,
    clientSecret: env.UBENTO_SERVICES_CLIENT_SECRET,
    audience: env.UBENTO_API_AUDIENCE,
  }),
  serviceBaseUrls,
});
