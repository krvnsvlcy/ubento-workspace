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
  // auth
  AUTH_CLIENT_ID: {
    type: "string",
    required: true,
  },
  AUTH_CLIENT_SECRET: {
    type: "string",
    required: true,
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
});
