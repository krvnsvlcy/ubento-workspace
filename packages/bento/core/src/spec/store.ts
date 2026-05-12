import { z } from "zod";

const entityStoreEntrySchema = z.object({
  type: z.literal("entity"),
  name: z.string(),
  service: z.string(),
  entity: z.string(),
  id: z.string(),
});
export type EntityStoreEntry = z.infer<typeof entityStoreEntrySchema>;

const entityListStoreEntrySchema = z.object({
  type: z.literal("entity-list"),
  name: z.string(),
  service: z.string(),
  entity: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type EntityListStoreEntry = z.infer<typeof entityListStoreEntrySchema>;

const pagedEntityListStoreEntrySchema = z.object({
  type: z.literal("paged-entity-list"),
  name: z.string(),
  service: z.string(),
  entity: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type PagedEntityListStoreEntry = z.infer<
  typeof pagedEntityListStoreEntrySchema
>;

const infiniteEntityListStoreEntrySchema = z.object({
  type: z.literal("infinite-entity-list"),
  name: z.string(),
  service: z.string(),
  entity: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type InfiniteEntityListStoreEntry = z.infer<
  typeof infiniteEntityListStoreEntrySchema
>;

const queryStoreEntrySchema = z.object({
  type: z.literal("query"),
  name: z.string(),
  service: z.string(),
  query: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type QueryStoreEntry = z.infer<typeof queryStoreEntrySchema>;

const actionStoreEntrySchema = z.object({
  type: z.literal("action"),
  name: z.string(),
  service: z.string(),
  action: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});
export type ActionStoreEntry = z.infer<typeof actionStoreEntrySchema>;

export const storeEntrySchema = z.discriminatedUnion("type", [
  entityStoreEntrySchema,
  entityListStoreEntrySchema,
  pagedEntityListStoreEntrySchema,
  infiniteEntityListStoreEntrySchema,
  queryStoreEntrySchema,
  actionStoreEntrySchema,
]);

export const storeSpecSchema = z.record(z.string(), storeEntrySchema);

export type StoreSpec = z.infer<typeof storeSpecSchema>;
export type StoreEntry =
  | EntityStoreEntry
  | EntityListStoreEntry
  | PagedEntityListStoreEntry
  | InfiniteEntityListStoreEntry
  | QueryStoreEntry
  | ActionStoreEntry;
