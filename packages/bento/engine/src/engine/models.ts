import { z } from "zod";

export const moduleReferenceSchema = z.discriminatedUnion("scope", [
  z.object({
    scope: z.literal("public"),
    id: z.string(),
    versionId: z.string(),
  }),
  z.object({
    scope: z.literal("private"),
    id: z.string(),
    versionId: z.string().optional(),
  }),
]);
export type ModuleReference = z.infer<typeof moduleReferenceSchema>;
export type StableModuleReference = {
  scope: ModuleReference["scope"];
  id: string;
  versionId: string;
};

export const lengthSchema = z.object({
  value: z.number(),
  unit: z.enum(["px", "%", "fr"]),
});
export type Length = z.infer<typeof lengthSchema>;

export const baseElementStyleSchema = z.object({
  width: lengthSchema.optional(),
  height: lengthSchema.optional(),
  minWidth: z.number().default(64),
  maxWidth: z.number().optional(),
  minHeight: z.number().default(64),
  maxHeight: z.number().optional(),
});
export type BaseStyle = z.infer<typeof baseElementStyleSchema>;

export const stackStyleSchema = baseElementStyleSchema.extend({
  direction: z.enum(["row", "column"]).default("column"),
  gap: z.number().default(24),
  justify: z
    .enum(["start", "end", "center", "space-between", "space-around"])
    .default("start"),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
});
export type StackStyle = z.infer<typeof stackStyleSchema>;

export const defaultStackStyle = stackStyleSchema.parse({});

export const stackDataSchema = z.object({
  type: z.literal("stack"),
  style: stackStyleSchema.default(defaultStackStyle),
  content: z.array(z.string()),
});
export type StackData = z.infer<typeof stackDataSchema>;

export const moduleDataSchema = z.object({
  id: z.string(),
  latestVersionId: z.string(),
});
export type ModuleData = z.infer<typeof moduleDataSchema>;

export const blockDataSchema = z.object({
  type: z.literal("block"),
  module: moduleReferenceSchema,
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
  padding: z
    .object({
      top: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
      right: z.number().optional(),
    })
    .default({ top: 24, bottom: 24, left: 24, right: 24 }),
  direction: z.enum(["row", "column"]).default("column"),
  gap: z.number().default(24),
  flow: z.enum(["scroll", "fixed"]).default("scroll"),
});
export type BoardStyle = z.infer<typeof boardStyleSchema>;

export const defaultBoardStyle = boardStyleSchema.parse({});

export const boardDataSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  style: boardStyleSchema.default(defaultBoardStyle),
  content: z.array(z.string()).default([]),
  elements: z.record(z.string(), elementDataSchema).default({}),
});
export type BoardData = z.infer<typeof boardDataSchema>;

export const serviceDataSchema = z.object({
  module: moduleReferenceSchema,
  args: z.record(z.string(), z.any()).optional(),
});
export type ServiceData = z.infer<typeof serviceDataSchema>;

export const workspaceDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  teamId: z.string(),
  homeBoardId: z.string().optional(),
  services: z.record(z.string(), serviceDataSchema).default({}),
});
export type WorkspaceData = z.infer<typeof workspaceDataSchema> & {
  services: Record<string, z.infer<typeof serviceDataSchema>>;
};
