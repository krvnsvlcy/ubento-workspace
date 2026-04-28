import React from "react";
import { useStore } from "zustand";
import { EngineContext, EngineStoreApi } from "../engine.js";
import { Board } from "./board/board.js";
import { NoBoard } from "./board/no-board.js";

export function Workspace({
  engine,
}: {
  engine: EngineStoreApi;
}): React.JSX.Element {
  const location = useStore(engine, (s) => s.location);
  let content = <></>;

  if (location?.boardId) {
    content = <Board id={location.boardId} params={location.params || {}} />;
  } else {
    content = <NoBoard />;
  }

  return <EngineContext value={engine}>{content}</EngineContext>;
}
