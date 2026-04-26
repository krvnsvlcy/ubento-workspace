import { PendingView } from "@ubento/bento-primitives";
import { Workspace, type WorkspaceData } from "@ubento/engine";
import { useEffect, useState } from "react";
import { useKeyboardController } from "./keyboard.js";
import { rpc } from "./rpc.js";
import { createEngineController, setModuleUrlTemplate } from "./state.js";

const controller = createEngineController();

export function GuestWorkspace() {
  useKeyboardController();
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);

  useEffect(() => {
    rpc.setHandlers({
      init: ({
        workspace,
        moduleUrlTemplate,
      }: {
        workspace: WorkspaceData;
        moduleUrlTemplate: string;
      }) => {
        setModuleUrlTemplate(moduleUrlTemplate);
        controller.setWorkspace(workspace);
        setWorkspace(workspace as any);
        rpc.egress.ready({});
      },
      contextChanged: ({ context }) => {
        alert(JSON.stringify(context));
        controller.state = context;
      },

      // mutations
      setHomeBoardId: async ({ homeBoardId }) => {
        controller.setHomeBoardId(homeBoardId);
      },
      deleteBoard: async ({ boardId }) => {
        controller.deleteBoard(boardId);
      },
      setBoardContent: async ({ boardId, content }) => {
        controller.setBoardContent(boardId, content);
      },
      addElement: async ({ boardId, containerId, element }) => {
        return controller.addElement(boardId, containerId, element);
      },
      deleteElement: async ({ boardId, elementId }) => {
        controller.deleteElement(boardId, elementId);
      },
      setElementStyle: ({ id, style }) => {
        controller.setElementStyle(id, style);
      },
      setElementProps: ({ id, props }) => {
        controller.setElementProps(id, props);
      },
      setStackContent: async ({ id, content }) => {
        controller.setStackContent(id, content);
      },
      setBlockModule: ({ id, moduleId, moduleVersionId }) => {
        controller.setBlockModule(id, moduleId, moduleVersionId);
      },
    });
    rpc.egress.connect({});
  }, []);

  let content: React.ReactNode;

  if (!workspace) {
    content = <PendingView message="Loading Workspace..." />;
  } else {
    content = <Workspace workspace={workspace} controller={controller} />;
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
