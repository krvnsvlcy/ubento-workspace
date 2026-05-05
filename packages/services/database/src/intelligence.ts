import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import {
  Prisma,
  PrismaClient,
} from "../prisma/generated/intelligence/index.js";
import rawPrismaSchemas from "./schemas/intelligence/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/intelligence/index.js";

export function createIntelligenceClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "intelligence"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type IntelligencePrismaClient = ReturnType<
  typeof createIntelligenceClient
>;

export const intelligenceSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas as any),
);
