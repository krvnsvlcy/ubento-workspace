import { defineEnv } from "@ubento/primitives";
import { getServiceDefaultPort } from "@ubento/service-toolkit";
import dotenv from "dotenv";

dotenv.config();
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("app"),
  },
  // database
  DATABASE_URL: {
    type: "string",
    required: true,
  },
});
