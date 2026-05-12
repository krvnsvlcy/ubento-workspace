import { PropsWithChildren } from "react";
import { BoardSpec } from "../../spec/board.js";
import { useBoardState } from "../renderer.js";
import {
  BoardRenderingContext,
  useBoardRenderingContext,
} from "../states/context.js";
import { useWorkspaceState } from "../states/workspace.js";

export function BoardRenderingContextProvider({
  spec,
  children,
}: {
  spec: BoardSpec;
  children: React.ReactNode;
}) {
  const state = useBoardState();
  const workspaceState = useWorkspaceState();

  return (
    <BoardRenderingContext
      value={{
        workspace: {
          state: workspaceState,
        },
        state,
        store: {},
      }}
    >
      {children}
    </BoardRenderingContext>
  );
}

export function applyPatch<T = any>(
  obj: any,
  path: (string | number)[],
  value: any,
): T {
  // Base case: we've reached the target node, replace it with the new value
  if (path.length === 0) {
    return value;
  }

  const [currentKey, ...restPath] = path;

  // Infer the structure type. If `obj` is null/undefined (missing path),
  // we look at the current key to decide whether to spawn an array or an object.
  const isArray =
    Array.isArray(obj) || (obj == null && typeof currentKey === "number");
  const source = obj == null ? (isArray ? [] : {}) : obj;

  if (isArray) {
    // Clone array and recurse
    const copy = [...source];
    copy[currentKey as number] = applyPatch(
      source[currentKey],
      restPath,
      value,
    );
    return copy as unknown as T;
  }

  // Clone object and recurse
  const copy = { ...source };
  copy[currentKey as string] = applyPatch(source[currentKey], restPath, value);
  return copy as T;
}

export function BoardRenderingContextPatch({
  path,
  value,
  children,
}: PropsWithChildren<{
  path: (string | number)[];
  value: Record<string, unknown>;
}>) {
  const context = useBoardRenderingContext();
  const newContext = applyPatch(context, path, value);
  return (
    <BoardRenderingContext value={newContext}>{children}</BoardRenderingContext>
  );
}
