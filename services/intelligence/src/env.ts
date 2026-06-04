import { defineEnv } from "@ubento/services.primitives";
import { getServiceDefaultPort } from "@ubento/services.toolkit";
import dotenv from "dotenv";

dotenv.config({ override: true });
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("intelligence"),
  },
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  // LLM
  OPENAI_API_KEY: {
    type: "string",
  },
  ANTHROPIC_API_KEY: {
    type: "string",
  },
  GEMINI_API_KEY: {
    type: "string",
  },
  AI_GATEWAY_API_KEY: {
    type: "string",
    required: true,
  },
  BYPASS_USAGE_ORGS: {
    type: "string",
  },
  GCP_INTELLIGENCE_BUCKET_NAME: {
    type: "string",
    required: true,
    default: "ubento-prod-intelligence-bucket",
  },
  UBENTO_AUTH_SERVER_URL: {
    type: "string",
    required: true,
  },
  UBENTO_SERVICES_CLIENT_ID: {
    type: "string",
    required: true,
  },
  UBENTO_SERVICES_CLIENT_SECRET: {
    type: "string",
    required: true,
  },
  UBENTO_API_AUDIENCE: {
    type: "string",
    required: true,
  },
  REDIS_HOST: {
    type: "string",
    required: true,
  },
  REDIS_PORT: {
    type: "number",
    required: true,
  },
  REDIS_USERNAME: {
    type: "string",
    required: true,
  },
  REDIS_PASSWORD: {
    type: "string",
    required: true,
  },
  UBENTO_SERVICE_BASE_URLS: {
    type: "string",
    default: "{}",
  },
});
