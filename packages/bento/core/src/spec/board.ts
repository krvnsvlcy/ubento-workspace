import { z } from "zod";
import { stateSpecSchema } from "./state.js";
import { storeSpecSchema } from "./store.js";
import { edgesSpec } from "./utils.js";

export const boardParameterSourceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("enum"),
    value: z.array(z.union([z.string(), z.number(), z.boolean()])),
  }),
  z.object({
    type: z.literal("entity"),
    entity: z.string(),
  }),
]);

export const boardParameterSpecSchema = z.object({
  label: z.string(),
  type: z.enum(["string", "number", "boolean"]),
  source: boardParameterSourceSchema.optional(),
});
export type BoardParameterSpec = z.infer<typeof boardParameterSpecSchema>;

export const boardStyleSchema = z.object({
  padding: edgesSpec(z.number()).optional(),
  direction: z.enum(["row", "column"]).optional(),
  gap: z.number().optional(),
  flow: z.enum(["scroll", "fixed"]).optional(),
});
export type BoardStyle = z.infer<typeof boardStyleSchema>;

export const listenerSpecSchema = z.object({
  action: z.string(),
  args: z.array(z.any()).optional(),
});
export type ListenerSpec = z.infer<typeof listenerSpecSchema>;

export const elementSpecSchema = z.object({
  component: z.string(),
  inputs: z.record(z.string(), z.any()).optional(),
  bindings: z.record(z.string(), z.string()).optional(),
  listeners: z.record(z.string(), listenerSpecSchema).optional(),
  children: z.array(z.string()).optional(),
});
export type ElementSpec = z.infer<typeof elementSpecSchema>;

export const boardUiSpecSchema = z.object({});
export type BoardUiSpec = z.infer<typeof boardUiSpecSchema>;

export const boardSpecSchema = z.object({
  // data
  params: z.record(z.string(), boardParameterSpecSchema).optional(),
  state: stateSpecSchema.optional(),
  store: storeSpecSchema.optional(),
  // view
  style: boardStyleSchema.optional(),
  children: z.array(z.string()).optional(),
  elements: z.record(z.string(), elementSpecSchema).optional(),
});
export type BoardSpec = z.infer<typeof boardSpecSchema>;
