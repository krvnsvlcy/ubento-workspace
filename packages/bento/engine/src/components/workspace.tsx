import React from "react";
import { useStore } from "zustand";
import { BentoEngine, EngineContext } from "../engine.js";
import { ServicesProvider } from "../services.js";
import { Board } from "./board/board.js";
import { NoBoard } from "./board/no-board.js";

export function Workspace({
  engine,
}: {
  engine: BentoEngine;
}): React.JSX.Element {
  const location = engine.useState((s) => s.location);
  let content = <></>;

  if (location?.boardId) {
    content = <Board id={location.boardId} params={location.params || {}} />;
  } else {
    content = <NoBoard />;
  }

  return (
    <EngineContext value={engine}>
      <ServicesProvider>{content}</ServicesProvider>
    </EngineContext>
  );
}
