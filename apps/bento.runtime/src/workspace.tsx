import { PendingView } from "@ubento/bento-primitives";
import { Workspace, type WorkspaceData } from "@ubento/engine";
import { useEffect, useState } from "react";
import { proxy } from "valtio";
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
        setWorkspace(proxy(workspace));
        rpc.egress.ready({});
      },
      modeChanged: ({ mode }) => {
        controller.state.mode = mode;
      },
      selectionChanged: ({ elementIds }) => {
        controller.state.selection = elementIds;
      },
      selectionScopeChanged: ({ scope }) => {
        controller.state.selectionScope = scope;
      },
      locationChanged: ({ boardId, params }) => {
        controller.state.location = { boardId, params: params || {} };
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
