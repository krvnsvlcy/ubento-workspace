import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/settings/index.js";
import { cleanUpJsonSchema } from "./schemas/utils.js";
import rawPrismaSchemas from "./schemas/settings/json-schema.json" with { type: "json" };
export * from "../prisma/generated/settings/index.js";

export function createSettingsClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "settings"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type SettingsPrismaClient = ReturnType<typeof createSettingsClient>;

export const settingsSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);
