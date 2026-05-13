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
  runQuery: ({
    service,
    query,
    params,
  }: {
    service: string;
    query: string;
    params?: Record<string, unknown>;
  }) => Promise<unknown>;
  runAction: ({
    service,
    action,
    params,
  }: {
    service: string;
    action: string;
    params?: Record<string, unknown>;
  }) => Promise<unknown>;
};

export type BentoEngineRuntimeRpcInterface = {
  setLocation: ({ location }: { location?: BentoLocation }) => Promise<void>;

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
