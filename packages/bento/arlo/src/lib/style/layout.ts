import { createContext, useContext } from "react";

export type LayoutContextType = "row" | "column" | "grid";
export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
);
export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutContext");
  }
  return context;
}
