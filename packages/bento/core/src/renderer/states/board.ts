import { createContext, useContext } from "react";
import { BoardSpec } from "../../spec/board";

export type BoardContextType = {
  spec: BoardSpec;
  params: Record<string, unknown>;
};
export const BoardContext = createContext<BoardContextType | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardContext");
  }
  return context;
}

export function useBoardElement(id: string) {
  const context = useBoardContext();
  const element = context.spec.elements?.[id];
  if (!element) {
    throw new Error("Element not found");
  }
  return element;
}
