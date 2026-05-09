import { WorkspaceEngineProvider } from "@/contexts/workspace";
import { WorkspaceContent } from "./content";
import { WorkspaceControl } from "./control/control";

export function Workspace() {
  return (
    <WorkspaceEngineProvider>
      <div className="relative w-full h-full">
        <WorkspaceContent />
        <WorkspaceControl />
      </div>
    </WorkspaceEngineProvider>
  );
}
