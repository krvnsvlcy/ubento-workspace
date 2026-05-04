import { z } from "zod";
import { stateSpecSchema } from "./state.js";
import { edgesSpec } from "./utils.js";

export const boardParameterSourceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("enum"),
    value: z.array(z.union([z.string(), z.number(), z.boolean()])),
  }),
  z.object({
    type: z.literal("generator"),
    generator: z.string(),
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

export const elementSpecSchema = z.object({
  component: z.string(),
  props: z.record(z.string(), z.any()).optional(),
  children: z.array(z.string()).optional(),
});
export type ElementSpec = z.infer<typeof elementSpecSchema>;

export const boardUiSpecSchema = z.object({});
export type BoardUiSpec = z.infer<typeof boardUiSpecSchema>;

export const boardSpecSchema = z.object({
  // metadata
  parentId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  // data
  params: z.record(z.string(), boardParameterSpecSchema),
  state: stateSpecSchema,
  // view
  style: boardStyleSchema.optional(),
  children: z.array(z.string()).optional(),
  elements: z.record(z.string(), elementSpecSchema).optional(),
});
export type BoardSpec = z.infer<typeof boardSpecSchema>;

// The Workspace wrapper you defined earlier
export type WorkspaceSpec = {
  state: Record<string, any>; // workspace level state
  boards: Record<string, BoardSpec>;
};
