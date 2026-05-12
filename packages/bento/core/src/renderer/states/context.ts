import { createContext, useContext } from "react";
import { StoreEntryState } from "../../environment/service";
import { State } from "../../environment/state";

export type BoardRenderingContextApi = {
  workspace: {
    state: State;
  };
  state: State;
  store: Record<string, StoreEntryState>;
};

export const BoardRenderingContext = createContext<
  BoardRenderingContextApi | undefined
>(undefined);

export const useBoardRenderingContext = () => {
  const context = useContext(BoardRenderingContext);
  if (!context) {
    throw new Error(
      "useBoardRenderingContext must be used within a BoardRenderingContext",
    );
  }
  return context;
};
