import { createEdgeUsageProxy } from "@ubento/services.billing-edge";
import { ubentoFeatures } from "@ubento/services.primitives";
import {
  createClientCredentialsTokenManager,
  UbentoSDK,
} from "@ubento/services.sdk";
import Redis from "ioredis";
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

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
});

// Create edge usage proxy for Intelligence weekly credits billing
export const intelligenceUsageProxy = createEdgeUsageProxy({
  usageKey: `edge:${ubentoFeatures.ai.weeklyCredits.code}`,
  featureCode: ubentoFeatures.ai.weeklyCredits.code,
  redis,
  ubentoSdk: ubento,
  blockSize: {
    min: 1,
    max: 100,
  },
});
