import {
  WorkspaceEngineProvider,
  useWorkspaceEngine,
} from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { SideSplitView } from "./components/split-view";
import { WorkspaceContent } from "./content";
import { WorkspaceControl } from "./control/control";
import { ControlPanel } from "./control/panel/control-panel";

export function Workspace() {
  return (
    <WorkspaceEngineProvider>
      <WorkspaceInner />
    </WorkspaceEngineProvider>
  );
}

function WorkspaceInner() {
  const appEngine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const showControls = appEngine.useState((s) => s.showControls);
  const rightPanelPinned = appEngine.useState((s) => s.rightPanelPinned);
  const rightPanelWidth = appEngine.useState((s) => s.rightPanelWidth);

  return (
    <SideSplitView
      right={{
        content:
          rightPanelPinned && showControls ? (
            <ControlPanel
              controller={workspaceEngine}
              onClose={() => appEngine.setShowControls(false)}
            />
          ) : null,
        size: rightPanelPinned && showControls ? rightPanelWidth : 0,
        onSizeChange: (size) => {
          appEngine.setState((state) => ({ ...state, rightPanelWidth: size }));
        },
        minSize: 320,
        maxSize: 800,
      }}
      gap={0}
    >
      <div className="relative w-full h-full">
        <WorkspaceContent />
        <WorkspaceControl />
      </div>
    </SideSplitView>
  );
}
