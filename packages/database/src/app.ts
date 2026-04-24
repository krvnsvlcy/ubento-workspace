import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/app/index.js";
import rawPrismaSchemas from "./schemas/app/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/app/index.js";

export function createAppClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "app"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type AppPrismaClient = ReturnType<typeof createAppClient>;

export const appSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);
