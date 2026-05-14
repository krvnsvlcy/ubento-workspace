import z from "zod";
import { referenceSchema } from "./ref";
import { objectSchemaSchema } from "./schema";

export const entitySpecSchema = z.object({
  name: z.string(),
  primaryKey: z.string(),
  schema: z.union([objectSchemaSchema, referenceSchema]),
});
