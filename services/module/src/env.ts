import { defineEnv } from "@ubento/services.primitives";
import { getServiceDefaultPort } from "@ubento/services.toolkit";
import dotenv from "dotenv";

dotenv.config();
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("module"),
  },
  // database
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  GCS_MODULE_BUCKET: {
    type: "string",
    required: true,
    default: "ubento-prod-modules",
  },
  GCS_USER_CONTENT_BUCKET: {
    type: "string",
    required: true,
    default: "ubento-prod-user-content",
  },
  USER_CONTENT_BASE_URL: {
    type: "string",
    default: "https://storage.googleapis.com/ubento-prod-user-content",
  },
});
