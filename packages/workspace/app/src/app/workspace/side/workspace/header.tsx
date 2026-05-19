import { Button } from "@ubento/workspace.primitives";
import { Box, Building2, Home, Sidebar } from "lucide-react";
import { useUbentoEngine } from "../../../../engine/app/engine";

export function WorkspaceHeader() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const slug = location.workspace;

  const { data: workspace } = engine.ubento.workspace.useWorkspaceBySlug(
    { slug: slug! },
    { enabled: !!slug },
  );

  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  function handleSidebarClick() {
    engine.setState((state) => ({
      ...state,
      leftPanelPinned: !state.leftPanelPinned,
    }));
  }

  return (
    <div className="px-3 flex gap-1">
      <div className="p-1 grow rounded-lg flex gap-2 text-sm text-neutral-content min-w-0 items-center">
        <div className="w-6 h-6 rounded-md bg-neutral-content/10 flex items-center justify-center shrink-0">
          {workspace ? <Box size={14} /> : <Building2 size={14} />}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="truncate text-sm font-medium">
            {workspace?.name || team?.name}
          </span>
        </div>
      </div>
      <Button 
        size="icon" 
        onClick={() => engine.goToLocation({ workspace: undefined, board: undefined, component: undefined })} 
        variant="ghost"
      >
        <Home size={14} />
      </Button>
      <Button size="icon" onClick={handleSidebarClick} variant="ghost">
        <Sidebar size={14} />
      </Button>
    </div>
  );
}
