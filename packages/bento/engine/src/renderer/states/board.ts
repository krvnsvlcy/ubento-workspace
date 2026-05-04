import { createContext, useContext } from "react";
import { BoardSpec } from "../../spec/board";

export const BoardContext = createContext<BoardSpec | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardContext");
  }
  return context;
}

export function useBoardState() {
  const context = useBoardContext();
  return context.state;
}

export function useBoardElement(id: string) {
  const context = useBoardContext();
  const element = context.elements?.[id];
  if (!element) {
    throw new Error("Element not found");
  }
  return element;
}
