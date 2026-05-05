import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/billing/index.js";
import rawPrismaSchemas from "./schemas/billing/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/billing/index.js";

export function createBillingClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "billing"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type BillingPrismaClient = ReturnType<typeof createBillingClient>;

export const billingSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas as any),
);
