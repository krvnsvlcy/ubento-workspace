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
  items: z.lazy(() => schemaSchema).optional(),
});

export const objectJsonSchema = z.object({
  type: z.literal("object"),
  properties: z
    .record(
      z.string(),
      z.lazy(() => schemaSchema),
    )
    .optional(),
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
