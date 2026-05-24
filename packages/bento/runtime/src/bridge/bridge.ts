import { BentoLocation, BentoRuntimeState } from "../runtime/runtime";
import { BentoBoardData } from "../runtime/types";

export type BentoEngineHostRpcInterface = {
  connect: () => { initialState: BentoRuntimeState };
  ready: () => Promise<void>;

  // data
  getBoard: ({ boardId }: { boardId: string }) => Promise<BentoBoardData>;
  listBoards: ({
    cursor,
    limit,
    parentId,
  }: {
    cursor?: string;
    limit?: number;
    parentId?: string;
  }) => Promise<{ boards: BentoBoardData[]; nextCursor?: string }>;
  goTo: ({ location }: { location?: BentoLocation }) => Promise<void>;
  createBoard: (args?: {
    title?: string;
    parentId?: string;
    spec?: any;
  }) => Promise<BentoBoardData>;

  // sync
  boardUpdated: ({ data }: { data: BentoBoardData }) => Promise<void>;
  selectionUpdated: ({ selection }: { selection: string[] }) => Promise<void>;
  hoverUpdated: ({ hovered }: { hovered?: string }) => Promise<void>;
  contextNodeUpdated: ({
    path,
    data,
  }: {
    path: string;
    data: any;
  }) => Promise<void>;

  // services
  runServiceOperation: (args: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }) => Promise<ServiceOperationResult>; // Updated here
};

export type BentoEngineRuntimeRpcInterface = {
  setLocation: ({ location }: { location?: BentoLocation }) => Promise<void>;
  setInteractionMode: ({ mode }: { mode: "edit" | "live" }) => Promise<void>;
  select: ({ selection }: { selection: string[] }) => Promise<void>;
  hover: ({ elementId }: { elementId: string }) => Promise<void>;
  unhover: ({ elementId }: { elementId: string }) => Promise<void>;

  watchContextNode: ({ path }: { path: string }) => Promise<string>;
  unwatchContextNode: ({ key }: { key: string }) => Promise<void>;

  readBoard: ({
    boardId,
  }: {
    boardId: string;
  }) => Promise<BentoBoardData | undefined>;
  writeBoard: ({
    boardId,
    data,
  }: {
    boardId: string;
    data: BentoBoardData;
  }) => Promise<void>;

  setTheme: ({ css }: { css: string }) => Promise<void>;

  // catalog
  getCatalog: ({}) => Promise<unknown>;
  listComponents: ({}) => Promise<Record<string, unknown>>;
  describeComponents: ({
    names,
  }: {
    names: string[];
  }) => Promise<Record<string, unknown>>;

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
