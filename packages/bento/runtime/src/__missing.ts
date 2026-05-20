import { z } from "zod";

export type ModuleReference = {
  id: string;
  versionId: string;
  scope?: string;
};

export const boardDataSchema = z.any();
export type BoardData = z.infer<typeof boardDataSchema>;

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
