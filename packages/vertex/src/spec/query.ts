import z from "zod";
import { handlerSchema } from "./handler";
import { schemaSchema } from "./schema";

export const querySpecSchema = z.object({
  name: z.string(),
  schema: schemaSchema,
  parameters: z.record(
    z.string(),
    z.object({
      schema: schemaSchema,
      required: z.boolean().optional(),
    }),
  ),
  handler: handlerSchema,
});
export type QuerySpec = z.infer<typeof querySpecSchema>;
