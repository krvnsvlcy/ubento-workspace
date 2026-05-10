import z from "zod";
import { operationHandlerSchema } from "./handler";
import { schemaSchema } from "./schema";

export const operationSpecSchema = z.object({
  name: z.string(),
  schema: schemaSchema,
  args: z.record(
    z.string(),
    z.object({
      schema: schemaSchema,
      required: z.boolean().optional(),
    }),
  ),
  handler: operationHandlerSchema,
});
export type OperationSpec = z.infer<typeof operationSpecSchema>;
