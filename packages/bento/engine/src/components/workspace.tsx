import React from "react";
import { useStore } from "zustand";
import { EngineController, EngineControllerContext } from "../controller.js";
import { WorkspaceData } from "../models.js";
import { Board } from "./board/board.js";
import { NoBoard } from "./board/no-board.js";

export function Workspace({
  workspace,
  controller,
}: {
  workspace: WorkspaceData;
  controller: EngineController;
}): React.JSX.Element {
  const snap = useStore(controller);
  let content = <></>;

  if (snap.location?.boardId) {
    content = (
      <Board id={snap.location.boardId} params={snap.location.params || {}} />
    );
  } else {
    content = <NoBoard />;
  }

  return (
    <EngineControllerContext value={controller}>
      {content}
    </EngineControllerContext>
  );
}
