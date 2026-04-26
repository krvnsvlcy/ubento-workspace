import { Authorizer, mongoDbUrlWithDatabase } from "@ubento/service-toolkit";
import { env } from "../env.js";

export const authorizer = new Authorizer(
  mongoDbUrlWithDatabase(env.DATABASE_URL!, "authorization"),
);
