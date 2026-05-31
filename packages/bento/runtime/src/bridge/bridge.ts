import { BentoLocation, BentoRuntimeState } from "../runtime/runtime";
import { BentoWorkspaceData } from "../runtime/types";
import { WorkspaceSpec } from "../spec.js";

export type BentoEngineHostRpcInterface = {
  connect: () => {
    initialState: BentoRuntimeState;
    registryModuleUrlTemplate: string;
  };
  ready: () => Promise<void>;

  // data
  goTo: ({ location }: { location?: BentoLocation }) => Promise<void>;
  createBoard: (args?: {
    title?: string;
    parentId?: string;
  }) => Promise<BentoWorkspaceData>;

  readModuleSource: ({
    moduleId,
    versionId,
  }: {
    moduleId: string;
    versionId: string;
  }) => Promise<{ sourceCode: string }>;
  getModuleRegistryAccessToken: () => Promise<string>;

  // services
  runServiceOperation: (args: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }) => Promise<ServiceOperationResult>; // Updated here

  onContextMenu: (args: {
    position: { x: number; y: number };
  }) => Promise<void>;
};

export type BentoEngineRuntimeRpcInterface = {
  setLocation: ({ location }: { location?: BentoLocation }) => Promise<void>;

  // sync
  workspaceUpdated: ({ data }: { data: BentoWorkspaceData }) => Promise<void>;

  // inspection and interaction
  readNode: (args: { selector: string }) => Promise<string>;
  clickNode: (args: { selector: string }) => Promise<void>;
  setValue: (args: { selector: string; value: string }) => Promise<void>;
  getValue: (args: { selector: string }) => Promise<string>;
  readLogs: (args: { from?: number; count?: number }) => Promise<string>;
  readContext: (args: { path: string }) => Promise<unknown>;
};

export type ServiceOperationErrorData = {
  code: string;
  message: string;
  isTransient: boolean;
  isIdempotent: boolean;
};

export type ServiceOperationResult =
  | {
      ok: true;
      error: undefined;
      result: unknown;
    }
  | {
      ok: false;
      error: ServiceOperationErrorData;
      result: undefined;
    };

export class ServiceOperationError extends Error {
  public code: string;
  public isTransient: boolean;
  public isIdempotent: boolean;
  public message: string;
  constructor(data: ServiceOperationErrorData) {
    super(data.message);
    this.message = data.message;
    this.name = "ServiceOperationError";
    this.code = data.code;
    this.isTransient = data.isTransient;
    this.isIdempotent = data.isIdempotent;
  }
}

export type ComponentEngineRuntimeRpcInterface = {
  init: (args: { code: string; props: any }) => void;
  updateCode: (args: { code: string }) => void;
  updateProps: (args: { props: any }) => void;
};

export type ComponentEngineRuntimeHostRpcInterface = {
  connect: (args: {}) => {
    workspaceSpec?: WorkspaceSpec;
    registryModuleUrlTemplate?: string;
  };
  ready: (args: {}) => Promise<void> | void;
  log: (args: { type: "log" | "error" | "warn" | "info"; args: any[] }) => void;
  getModuleRegistryAccessToken: (args: {}) => Promise<string> | string;
  runServiceOperation: (args: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }) => Promise<ServiceOperationResult>;
};
