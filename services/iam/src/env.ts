import { defineEnv } from "@ubento/services.primitives";
import { getServiceDefaultPort } from "@ubento/services.toolkit";
import dotenv from "dotenv";

dotenv.config();
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("iam"),
  },
  // database
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  // workos
  WORKOS_CLIENT_ID: {
    type: "string",
    required: true,
  },
  WORKOS_API_KEY: {
    type: "string",
    required: true,
  },
  // auth
  AUTH_SERVER_BASE_URL: {
    type: "string",
    required: true,
  },
});
