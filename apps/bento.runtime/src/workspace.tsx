import { PendingView } from "@ubento/bento-primitives";
import {
  Workspace,
  type EngineController,
  type WorkspaceData,
} from "@ubento/engine";
import { useEffect, useState } from "react";
import { useKeyboardController } from "./keyboard.js";
import { rpc } from "./rpc.js";
import { createEngineController } from "./state.js";

const controller = createEngineController();

export function GuestWorkspace() {
  useKeyboardController(controller as EngineController);
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);

  useEffect(() => {
    rpc.setHandlers({
      init: ({ workspace }: { workspace: WorkspaceData }) => {
        controller.getState().setWorkspace(workspace);
        setWorkspace(workspace as any);
        rpc.egress.ready({});
      },
      contextChanged: ({ context }) => {
        controller.setState(context);
      },

      // mutations
      setHomeBoardId: async ({ homeBoardId }) => {
        controller.getState().setHomeBoardId(homeBoardId);
      },
      deleteBoard: async ({ boardId }) => {
        controller.getState().deleteBoard(boardId);
      },
      setBoardContent: async ({ boardId, content }) => {
        controller.getState().setBoardContent(boardId, content);
      },
      addElement: async ({ boardId, containerId, element }) => {
        return controller.getState().addElement(containerId, element, boardId);
      },
      deleteElement: async ({ boardId, elementId }) => {
        controller.getState().deleteElement(elementId, boardId);
      },
      setElementStyle: ({ id, style }) => {
        controller.getState().setElementStyle(id, style);
      },
      setElementProps: ({ id, props }) => {
        controller.getState().setElementProps(id, props);
      },
      setStackContent: async ({ id, content }) => {
        controller.getState().setStackContent(id, content);
      },
      setBlockModule: ({ id, moduleId, moduleVersionId }) => {
        controller.getState().setBlockModule(id, moduleId, moduleVersionId);
      },
      setBoardStyle: ({ boardId, style }) => {
        controller.getState().setBoardStyle(boardId, style);
      },
    });
    rpc.egress.connect({});
  }, []);

  let content: React.ReactNode;

  if (!workspace) {
    content = <PendingView message="Loading Workspace..." />;
  } else {
    content = (
      <Workspace
        workspace={workspace}
        controller={controller as EngineController}
      />
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {content}
    </div>
  );
}
