import { z } from "zod";

function baseStateEntrySchema<T extends string>({ type }: { type: T }) {
  return z.object({
    type: z.literal(type),
  });
}

const stringStateEntrySchema = baseStateEntrySchema({
  type: "string",
});
const numberStateEntrySchema = baseStateEntrySchema({
  type: "number",
});
const booleanStateEntrySchema = baseStateEntrySchema({
  type: "boolean",
});
const arrayStateEntrySchema = baseStateEntrySchema({
  type: "array",
}).extend({
  item: z.lazy(() => stateEntrySchema).optional(),
});
const objectStateEntrySchema = baseStateEntrySchema({
  type: "object",
}).extend({
  properties: z
    .record(
      z.string(),
      z.lazy(() => stateEntrySchema),
    )
    .optional(),
});

export const stateEntrySchema: z.ZodType<any> = z.discriminatedUnion("type", [
  objectStateEntrySchema,
  arrayStateEntrySchema,
  stringStateEntrySchema,
  numberStateEntrySchema,
  booleanStateEntrySchema,
]);

export const stateSpecSchema = z.record(z.string(), stateEntrySchema);

export type StateSpec = z.infer<typeof stateSpecSchema>;
export type StateEntry = z.infer<typeof stateEntrySchema>;
