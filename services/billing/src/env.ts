import { defineEnv } from "@ubento/primitives";
import { getServiceDefaultPort } from "@ubento/service-toolkit";
import dotenv from "dotenv";

dotenv.config();
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("billing"),
  },
  DATABASE_URL: {
    type: "string",
    required: true,
  },
  LEMONSQUEEZY_API_KEY: {
    type: "string",
    required: true,
  },
  LEMONSQUEEZY_STORE_ID: {
    type: "string",
    required: true,
  },
  LEMONSQUEEZY_WEBHOOK_SECRET: {
    type: "string",
    required: true,
  },
  NODE_ENV: {
    type: "string",
    required: true,
  },
});
