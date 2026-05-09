import z from "zod";
import { objectJsonSchema, refSchema } from "./schema";

export const entityManifestSchema = z.object({
  name: z.string(),
  primaryKey: z.string(),
  schema: z.discriminatedUnion("type", [objectJsonSchema, refSchema]),
});
