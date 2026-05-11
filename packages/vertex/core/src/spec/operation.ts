import z from "zod";
import { schemaSchema } from "./schema";

export function operationSpecSchema<THandlerSpec extends z.ZodType>({
  handler,
}: {
  handler: THandlerSpec;
}) {
  return z.object({
    name: z.string(),
    schema: schemaSchema,
    args: z.record(
      z.string(),
      z.object({
        schema: schemaSchema,
        required: z.boolean().optional(),
      }),
    ),
    handler,
  });
}

export type OperationSpec<THandlerSpec extends z.ZodType> = z.infer<
  ReturnType<typeof operationSpecSchema<THandlerSpec>>
>;
