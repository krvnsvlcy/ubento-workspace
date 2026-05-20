import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/module/index.js";
import rawPrismaSchemas from "./schemas/module/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/module/index.js";

export function createModuleClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "module"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type ModulePrismaClient = ReturnType<typeof createModuleClient>;

export const moduleSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);
