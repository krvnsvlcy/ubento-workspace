import React from "react";
import { BentoEngine, EngineContext } from "../engine/engine.js";
import { Board } from "./board/board.js";
import { NoBoard } from "./board/no-board.js";
import { ServiceProvider } from "./services.js";

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
      <ServiceProvider>{content}</ServiceProvider>
    </EngineContext>
  );
}
