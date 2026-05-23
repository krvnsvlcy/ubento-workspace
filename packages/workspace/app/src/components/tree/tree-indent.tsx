import { createContext, useContext } from "react";

const TreeDepthContext = createContext(0);

export function TreeIndent({
  children,
  depth,
}: {
  children: React.ReactNode;
  depth?: number;
}) {
  const parentDepth = useContext(TreeDepthContext);
  const currentDepth = parentDepth + (depth ?? 1);
  return <TreeDepthContext value={currentDepth}>{children}</TreeDepthContext>;
}

export function useTreeDepth() {
  return useContext(TreeDepthContext);
}
