import { useUbentoEngine } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { ErrorView, PendingView } from "@ubento/workspace.primitives";
import { createContext, useContext } from "react";
import { CopilotContext } from "./copilot";

export const WorkspaceEngineContext = createContext<
  WorkspaceEngine | undefined
>(undefined);

export function useWorkspaceEngine() {
  const workspace = useContext(WorkspaceEngineContext);
  if (!workspace) {
    throw new Error(
      "useWorkspaceEngine must be used within WorkspaceEngineContext",
    );
  }
  return workspace;
}

export function WorkspaceEngineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appEngine = useUbentoEngine();
  const workspaceEngine = appEngine.useState((state) => state.workspace);
  const workspaceStatus = appEngine.useState((state) => state.workspaceStatus);

  if (workspaceStatus === "inactive" || workspaceStatus === "initializing") {
    return <PendingView message="Loading workspace..." />;
  } else if (workspaceStatus === "error" || !workspaceEngine) {
    return (
      <ErrorView
        message="Failed to load workspace"
        action={{
          label: "Retry",
          onClick: () => appEngine.reloadWorkspace(),
        }}
      />
    );
  }

  return (
    <WorkspaceEngineContext value={workspaceEngine}>
      <CopilotContext value={workspaceEngine.copilot}>
        {children}
      </CopilotContext>
    </WorkspaceEngineContext>
  );
}
