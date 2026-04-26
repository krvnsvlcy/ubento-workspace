import { z } from "zod";

export const baseStyleSchema = z.object({
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  minWidth: z.union([z.string(), z.number()]).optional(),
  maxWidth: z.union([z.string(), z.number()]).optional(),
  minHeight: z.union([z.string(), z.number()]).optional(),
  maxHeight: z.union([z.string(), z.number()]).optional(),
  background: z.string().optional(),
  cornerRadius: z.number().optional(),
  borderWidth: z.number().optional(),
  borderColor: z.string().optional(),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
  padding: z
    .object({
      top: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
      right: z.number().optional(),
    })
    .optional(),
});
export type BaseStyle = z.infer<typeof baseStyleSchema>;

export const containerStyleSchema = baseStyleSchema.extend({
  layout: z.enum(["flex", "grid", "none"]).optional(),
  direction: z.enum(["row", "column"]).optional(),
  gap: z
    .object({
      x: z.number().optional(),
      y: z.number().optional(),
    })
    .optional(),
  columns: z.number().optional(),
  rows: z.number().optional(),
  alignItems: z.enum(["start", "end", "center", "stretch"]).optional(),
  justifyContent: z
    .enum(["start", "end", "center", "stretch", "space-between"])
    .optional(),
});
export type ContainerStyle = z.infer<typeof containerStyleSchema>;

export const containerDataSchema = z.object({
  type: z.literal("container"),
  style: containerStyleSchema,
  content: z.array(z.string()), // Children IDs
});
export type ContainerData = z.infer<typeof containerDataSchema>;

export const moduleDataSchema = z.object({
  latestVersionId: z.string(),
});
export type ModuleData = z.infer<typeof moduleDataSchema>;

export const blockDataSchema = z.object({
  type: z.literal("block"),
  moduleId: z.string(),
  moduleVersionId: z.string().optional(),
  props: z.record(z.string(), z.any()).optional(),
  style: baseStyleSchema.optional(),
});
export type BlockData = z.infer<typeof blockDataSchema>;

export const elementDataSchema = z.discriminatedUnion("type", [
  containerDataSchema,
  blockDataSchema,
]);
export type ElementData = z.infer<typeof elementDataSchema>;

export const pageDataSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  rootId: z.string(),
  elements: z.record(z.string(), elementDataSchema),
});
export type PageData = z.infer<typeof pageDataSchema>;

export const appDataSchema = z.object({
  id: z.string(),
  homePageId: z.string().optional(),
});
export type AppData = z.infer<typeof appDataSchema>;
