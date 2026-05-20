import {
  autoIncrementOnUpdate,
  mongoDbUrlWithDatabase,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { Prisma, PrismaClient } from "../prisma/generated/vertex/index.js";
import { cleanUpJsonSchema } from "./schemas/utils.js";
import rawPrismaSchemas from "./schemas/vertex/json-schema.json" with { type: "json" };
export * from "../prisma/generated/vertex/index.js";

export function createVertexClient(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: mongoDbUrlWithDatabase(databaseUrl, "vertex"),
  }).$extends(autoIncrementOnUpdate(Prisma.defineExtension));
}

export type VertexPrismaClient = ReturnType<typeof createVertexClient>;

export const vertexSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas as any),
);
