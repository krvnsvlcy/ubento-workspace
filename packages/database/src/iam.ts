import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/iam/index.js";
import rawPrismaSchemas from "./schemas/iam/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/iam/index.js";

export function createIamClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "iam"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type IamPrismaClient = ReturnType<typeof createIamClient>;

export const iamSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);
