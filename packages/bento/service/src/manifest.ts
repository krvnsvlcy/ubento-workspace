import z from "zod";

export const stringJsonSchema = z.object({
  type: z.literal("string"),
});

export const numberJsonSchema = z.object({
  type: z.literal("number"),
});

export const booleanJsonSchema = z.object({
  type: z.literal("boolean"),
});

export const arrayJsonSchema = z.object({
  type: z.literal("array"),
  items: z.lazy(() => schemaSchema),
});

export const objectJsonSchema = z.object({
  type: z.literal("object"),
  properties: z.record(
    z.string(),
    z.lazy(() => schemaSchema),
  ),
  required: z.array(z.string()).optional(),
});

export const refSchema = z.object({
  type: z.literal("ref"),
  ref: z.string(),
});

export const schemaSchema: z.ZodType = z.discriminatedUnion("type", [
  objectJsonSchema,
  arrayJsonSchema,
  stringJsonSchema,
  numberJsonSchema,
  booleanJsonSchema,
  refSchema,
]);

const entityManifestSchema = z.object({
  name: z.string(),
  primaryKey: z.string(),
  schema: z.discriminatedUnion("type", [objectJsonSchema, refSchema]),
});

const queryManifestSchema = z.object({
  name: z.string(),
  schema: schemaSchema,
  parameters: z.record(
    z.string(),
    z.object({
      schema: schemaSchema,
      required: z.boolean().optional(),
    }),
  ),
});

const actionManifestSchema = z.object({
  name: z.string(),
  parameters: z.record(
    z.string(),
    z.object({
      schema: schemaSchema,
      required: z.boolean().optional(),
    }),
  ),
});

export const serviceManifestSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  schemas: z.record(z.string(), schemaSchema).optional(),
  entities: z.record(z.string(), entityManifestSchema).optional(),
  queries: z.record(z.string(), queryManifestSchema).optional(),
  actions: z.record(z.string(), actionManifestSchema).optional(),
});

export type ServiceManifest = z.infer<typeof serviceManifestSchema>;
