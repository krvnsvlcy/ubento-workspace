import { createContext } from "react";

export const ParentContext = createContext<string | undefined>(undefined);
export const StackContext = createContext<{ flex: "row" | "column" }>({
  flex: "row",
});
