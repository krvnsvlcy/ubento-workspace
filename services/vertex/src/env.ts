import { defineEnv } from "@ubento/services.primitives";
import { getServiceDefaultPort } from "@ubento/services.toolkit";
import dotenv from "dotenv";

dotenv.config();

export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("vertex"),
  },
  GCP_PROJECT_ID: {
    type: "string",
    required: true,
  },
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  GCP_SERVICE_BUCKET_NAME: {
    type: "string",
    required: true,
  },
  GCP_USER_CONTENT_BUCKET_NAME: {
    type: "string",
    required: true,
  },
  USER_CONTENT_BASE_URL: {
    type: "string",
    default: "https://storage.googleapis.com/ubento-prod-user-content",
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
  UBENTO_SERVICE_BASE_URLS: {
    type: "string",
    default: "{}",
  },
});
