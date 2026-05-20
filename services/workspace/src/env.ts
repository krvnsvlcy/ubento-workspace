import { defineEnv } from "@ubento/services.primitives";
import { getServiceDefaultPort } from "@ubento/services.toolkit";
import dotenv from "dotenv";

dotenv.config();
export const env = defineEnv({
  PORT: {
    type: "number",
    default: getServiceDefaultPort("workspace"),
  },
  // database
  DATABASE_URL: {
    type: "string",
    required: true,
  },
});
