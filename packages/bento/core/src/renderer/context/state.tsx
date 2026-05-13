import { PropsWithChildren, useState } from "react";
import { BoardRenderingContextPatch } from "./context";

export function BoardStateProvider({
  children,
  initialState,
}: PropsWithChildren<{ initialState: Record<string, unknown> }>) {
  const [state] = useState(initialState);

  return (
    <BoardRenderingContextPatch path={["state"]} value={state}>
      {children}
    </BoardRenderingContextPatch>
  );
}
