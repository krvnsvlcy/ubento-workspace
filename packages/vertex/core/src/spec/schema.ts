import z from "zod";

export const schemaSchema: z.ZodType = z.looseObject({});
export const objectSchemaSchema: z.ZodType = z.looseObject({
  type: "object",
});
