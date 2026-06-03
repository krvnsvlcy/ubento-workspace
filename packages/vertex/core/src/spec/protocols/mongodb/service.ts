import { z } from "zod";

export const mongodbCollectionSpecV1Schema = z.object({
  name: z.string().describe("The exact name of the collection in the database"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),

  // Storing the inferred or defined JSON schema of the documents
  schema: z
    .record(z.string(), z.any())
    .optional()
    .describe(
      "The structural schema of the collection (e.g., standard JSON Schema format) used for frontend autocomplete",
    ),
});

export const mongodbDatabaseSpecV1Schema = z.object({
  name: z.string().describe("The name of the database"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  collections: z.array(mongodbCollectionSpecV1Schema).default([]),
});

export const mongodbServiceSpecV1Schema = z.object({
  // System / Versioning
  spec: z.literal(1),
  type: z.literal("mongodb"),

  // Metadata
  name: z
    .string()
    .describe("User-defined friendly name for this service instance"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),

  // Connection Linkage
  connectionId: z
    .string()
    .describe("The ID of the stored credentials/connection to use"),

  // Databases (FIXED: Now properly uses the Database spec schema)
  databases: z.array(mongodbDatabaseSpecV1Schema).default([]),
});

export type MongodbCollectionSpecV1 = z.infer<
  typeof mongodbCollectionSpecV1Schema
>;
export type MongodbDatabaseSpecV1 = z.infer<typeof mongodbDatabaseSpecV1Schema>;
export type MongodbServiceSpecV1 = z.infer<typeof mongodbServiceSpecV1Schema>;
