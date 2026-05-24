import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { SessionApi, WorkspaceApi } from "../../environment/environment.js";
import { useEnvironment } from "../states/environment.js";

export type BoardApi = {
  id: string;
  title: string;
  setTitle: (title: string) => void;
};
export type BoardRenderingContextType = {
  session: SessionApi;
  workspace: WorkspaceApi;
  board: BoardApi;
  params: Record<string, unknown>;
  state: Record<string, unknown>;
  setState: (
    updater: Record<string, unknown> | ((d: Record<string, unknown>) => void),
  ) => void;
  store: Record<string, unknown>;
};

export const BoardRenderingContext = createContext<
  BoardRenderingContextType | undefined
>(undefined);

export const useBoardRenderingContext = (): BoardRenderingContextType => {
  const context = useContext(BoardRenderingContext);
  if (!context) {
    throw new Error(
      "useBoardRenderingContext must be used within a BoardRenderingContext",
    );
  }
  return context;
};

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
  value: unknown;
}>) {
  const context = useBoardRenderingContext();
  const newContext = applyPatch(context, path, value);
  return (
    <BoardRenderingContext value={newContext}>{children}</BoardRenderingContext>
  );
}

export function ContextCapture() {
  const context = useBoardRenderingContext();
  const environment = useEnvironment();

  useEffect(() => {
    environment.contextManager.setContext(context);
    return () => {
      environment.contextManager.setContext(null);
    };
  }, [context, environment]);

  return <></>;
}
