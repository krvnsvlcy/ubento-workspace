import { z } from "zod";

// --- Types ---
export type BaseTypedState<T extends string> = {
  type: T;
};
export type StringState = BaseTypedState<"string">;
export type NumberState = BaseTypedState<"number">;
export type BooleanState = BaseTypedState<"boolean">;
export type ObjectState = BaseTypedState<"object"> & {
  properties: Record<string, TypedState>;
};
export type ArrayState = BaseTypedState<"array"> & {
  item: TypedState;
};
export type TypedState =
  | StringState
  | NumberState
  | BooleanState
  | ObjectState
  | ArrayState;

export type EntityState = {
  $entity: {
    store: string;
    key: string;
  };
};
export type EntityListState = {
  $entityList: {
    store: string;
    filter: Record<string, unknown>;
    page: unknown;
  };
};

export type MutationState = {
  $mutation: {
    mutation: string;
  };
};

export type QueryState = {
  $query: {
    query: string;
    params?: Record<string, TypedState>;
  };
};

export type StateEntry =
  | TypedState
  | EntityState
  | EntityListState
  | QueryState
  | MutationState;

export type State = Record<string, StateEntry>;

// --- Zod Schema ---
export const stateEntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("object"),
    value: z.record(z.string(), z.any()),
  }),
  z.object({
    type: z.literal("array"),
    value: z.array(z.any()),
  }),
  z.object({
    type: z.literal("string"),
    value: z.string(),
  }),
  z.object({
    type: z.literal("number"),
    value: z.number(),
  }),
  z.object({
    type: z.literal("boolean"),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("entity"),
    store: z.string(),
    key: z.string(),
  }),
  z.object({
    type: z.literal("entity-list"),
    store: z.string(),
    params: z.record(z.string(), z.any()).optional(),
  }),
  z.object({
    type: z.literal("query"),
    query: z.string(),
    params: z.record(z.string(), z.any()).optional(),
  }),
  z.object({
    type: z.literal("mutation"),
    mutation: z.string(),
    params: z.record(z.string(), z.any()).optional(),
  }),
]);

export const stateSpecSchema = z.record(z.string(), stateEntrySchema);
