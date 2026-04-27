import { z } from "zod";

export const baseElementStyleSchema = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  minWidth: z.number().optional(),
  maxWidth: z.number().optional(),
  minHeight: z.number().optional(),
  maxHeight: z.number().optional(),
  background: z.string().optional(),
  cornerRadius: z.number().optional(),
  borderWidth: z.number().optional(),
  borderColor: z.string().optional(),
  flex: z.number().optional(),
  padding: z
    .object({
      top: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
      right: z.number().optional(),
    })
    .optional(),
});
export type BaseStyle = z.infer<typeof baseElementStyleSchema>;

export const stackStyleSchema = baseElementStyleSchema.extend({
  direction: z.enum(["row", "column"]).optional(),
  gap: z.number().optional(),
  justify: z
    .enum(["start", "end", "center", "space-between", "space-around"])
    .optional(),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
});
export type StackStyle = z.infer<typeof stackStyleSchema>;

export const stackDataSchema = z.object({
  type: z.literal("stack"),
  style: stackStyleSchema,
  content: z.array(z.string()),
});
export type StackData = z.infer<typeof stackDataSchema>;

export const moduleDataSchema = z.object({
  latestVersionId: z.string(),
});
export type ModuleData = z.infer<typeof moduleDataSchema>;

export const blockDataSchema = z.object({
  type: z.literal("block"),
  moduleId: z.string(),
  moduleVersionId: z.string().optional(),
  props: z.record(z.string(), z.any()).optional(),
  style: baseElementStyleSchema.optional(),
});
export type BlockData = z.infer<typeof blockDataSchema>;

export const elementDataSchema = z.discriminatedUnion("type", [
  stackDataSchema,
  blockDataSchema,
]);
export type ElementData = z.infer<typeof elementDataSchema>;

export const boardStyleSchema = z.object({
  background: z.string().optional(),
  padding: z
    .object({
      top: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
      right: z.number().optional(),
    })
    .optional(),
  direction: z.enum(["row", "column"]).optional(),
  gap: z.number().optional(),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
});
export type BoardStyle = z.infer<typeof boardStyleSchema>;

export const boardDataSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  style: boardStyleSchema.optional(),
  content: z.array(z.string()).default([]),
  elements: z.record(z.string(), elementDataSchema).default({}),
});
export type BoardData = z.infer<typeof boardDataSchema>;

export const workspaceDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  homeBoardId: z.string().optional(),
});
export type WorkspaceData = z.infer<typeof workspaceDataSchema>;

export function createBoard(
  data: Partial<BoardData> & { id: string },
): BoardData {
  return {
    name: "Untitled Board",
    content: ["root"],
    elements: {},
    ...data,
  };
}
