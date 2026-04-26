import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/service-toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/workspace/index.js";
import rawPrismaSchemas from "./schemas/workspace/json-schema.json" with { type: "json" };
import { cleanUpJsonSchema } from "./schemas/utils.js";
export * from "../prisma/generated/workspace/index.js";

export function createWorkspaceClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "workspace"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type WorkspacePrismaClient = ReturnType<typeof createWorkspaceClient>;

export const workspaceSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);
