import { z } from "zod";

const entityStateEntrySchema = z.object({
  type: z.literal("entity"),
  store: z.string(),
  key: z.string(),
});
const entityListStateEntrySchema = z.object({
  type: z.literal("entity-list"),
  store: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});

const queryStateEntrySchema = z.object({
  type: z.literal("query"),
  query: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});

const mutationStateEntrySchema = z.object({
  type: z.literal("mutation"),
  mutation: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});

export const storeEntrySchema = z.discriminatedUnion("type", [
  entityStateEntrySchema,
  entityListStateEntrySchema,
  queryStateEntrySchema,
  mutationStateEntrySchema,
]);

export const storeSpecSchema = z.record(z.string(), storeEntrySchema);

export type StoreSpec = z.infer<typeof storeSpecSchema>;
export type StoreEntry = z.infer<typeof storeEntrySchema>;
