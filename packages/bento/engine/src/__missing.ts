import { z } from "zod";
import { boardSpecSchema } from "./spec/board.js";

export type BentoMode = "live" | "edit" | "design" | "preview";

export type ModuleReference = {
  id: string;
  versionId: string;
  scope?: string;
};

export const boardDataSchema = boardSpecSchema.extend({
  id: z.string(),
  name: z.string(),
  content: z.array(z.string()).optional(),
  elements: z.record(z.string(), z.any()).optional(),
});
export type BoardData = z.infer<typeof boardDataSchema>;

export const serviceDataSchema = z.object({
  moduleId: z.string().optional(),
  moduleVersionId: z.string().optional(),
  args: z.record(z.string(), z.any()).optional(),
  module: z
    .object({
      id: z.string(),
      versionId: z.string(),
    })
    .optional(),
});
export type ServiceData = z.infer<typeof serviceDataSchema>;

export const workspaceDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  teamId: z.string().optional(),
  homeBoardId: z.string().optional(),
  services: z.record(z.string(), serviceDataSchema).optional(),
});
export type WorkspaceData = z.infer<typeof workspaceDataSchema>;

export type DropContent =
  | { type: "element"; elementId: string; boardId: string }
  | { type: "module"; ref: ModuleReference };

export type DropRect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rect?: { x: number; y: number; width: number; height: number };
  data: any;
};

// For ComponentEngine
export interface ComponentEngineRuntimeHostRpcInterface {
  connect: () => Promise<void>;
  ready: () => Promise<void>;
  log: (args: {
    type: "log" | "error" | "warn" | "info";
    args: any[];
  }) => Promise<void>;
  [key: string]: (args: any) => any;
}

export interface ComponentEngineRuntimeRpcInterface {
  init: (args: { code: string }) => Promise<void>;
  updateCode: (args: { code: string }) => Promise<void>;
  [key: string]: (args: any) => any;
}

// Other missing types from shared.tsx
export type BaseStyle = Record<string, any>;
export type BlockData = {
  id: string;
  type: string;
  content: string[];
  style?: BaseStyle;
  moduleId: string;
  moduleVersionId?: string;
};
export type ElementData = {
  id: string;
  component: string;
  type?: string;
  inputs?: Record<string, any>;
  style?: BaseStyle;
};
