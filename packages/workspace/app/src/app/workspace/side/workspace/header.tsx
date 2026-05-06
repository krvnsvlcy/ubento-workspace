import { Button } from "@ubento/workspace.primitives";
import { Building2, Sidebar } from "lucide-react";
import { useUbentoEngine } from "../../../../engine/engine";

export function WorkspaceHeader() {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);

  function handleTeamClick() {
    // Open team modal
  }

  function handleSidebarClick() {
    // Close sidebar
    engine.setState((state) => ({ ...state, leftPanelOpen: false }));
  }

  return (
    <div className="px-3 flex items-center gap-1">
      <div
        onClick={handleTeamClick}
        className="p-1 grow rounded-lg hover:bg-neutral-surface-hover transition-colors cursor-pointer flex items-center gap-2 font-semibold text-sm text-neutral-content"
      >
        <div className="w-6 h-6 rounded-md bg-neutral-content/10 flex items-center justify-center">
          <Building2 size={14} />
        </div>
        <span className="truncate">{session?.name || "Team"}</span>
      </div>
      <Button size="icon" onClick={handleSidebarClick}>
        <Sidebar size={14} />
      </Button>
    </div>
  );
}
