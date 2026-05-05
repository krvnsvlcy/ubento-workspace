import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/integration/index.js";
import rawPrismaSchemas from "./schemas/integration/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/integration/index.js";

export function createIntegrationClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "integration"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type IntegrationPrismaClient = ReturnType<
  typeof createIntegrationClient
>;

export const integrationSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas as any),
);
