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
};
