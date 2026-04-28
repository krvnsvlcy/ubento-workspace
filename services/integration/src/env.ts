import { defineEnv } from "@ubento/primitives";
import { getServiceDefaultPort } from "@ubento/service-toolkit";
import dotenv from "dotenv";

dotenv.config();

export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("integration"),
  },
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  AUTH_ENCRYPTION_KEY: {
    type: "string",
    required: true,
  },
  GCP_EXTENSION_BUCKET_NAME: {
    type: "string",
    required: true,
  },
});
