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

  // sync
  boardUpdated: ({ data }: { data: BentoBoardData }) => Promise<void>;
  selectionUpdated: ({ selection }: { selection: string[] }) => Promise<void>;

  // services
  runServiceOperation: ({
    service,
    type,
    name,
    args,
  }: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }) => Promise<unknown>;
};

export type BentoEngineRuntimeRpcInterface = {
  setLocation: ({ location }: { location?: BentoLocation }) => Promise<void>;
  setInteractionMode: ({ mode }: { mode: "edit" | "live" }) => Promise<void>;

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
    data: Partial<BentoBoardData>;
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
};
