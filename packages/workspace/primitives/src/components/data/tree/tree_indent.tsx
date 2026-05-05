import type { PropsWithChildren} from "react";
import { useContext } from "react";
import { TreeContext } from "@/components/data/tree/tree_context.js";

export function TreeIndent({
  indent = 1,
  children,
}: PropsWithChildren<{
  indent?: number;
}>) {
  const context = useContext(TreeContext);

  return (
    <TreeContext.Provider value={{ ...context, depth: context.depth + indent }}>
      {children}
    </TreeContext.Provider>
  );
}
