import { z } from "zod";

const queryStoreEntrySchema = z.object({
  type: z.literal("query"),
  service: z.string(),
  query: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type QueryStoreEntry = z.infer<typeof queryStoreEntrySchema>;

const actionStoreEntrySchema = z.object({
  type: z.literal("action"),
  service: z.string(),
  action: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type ActionStoreEntry = z.infer<typeof actionStoreEntrySchema>;

export const storeEntrySchema = z.discriminatedUnion("type", [
  queryStoreEntrySchema,
  actionStoreEntrySchema,
]);

export const storeSpecSchema = z.record(z.string(), storeEntrySchema);

export type StoreSpec = z.infer<typeof storeSpecSchema>;
export type StoreEntry = QueryStoreEntry | ActionStoreEntry;
