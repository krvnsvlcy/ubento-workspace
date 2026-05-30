import { useUbentoEngine } from "@/hooks/app-engine";
import { Button } from "@ubento/bento.arlo-core";
import { Home, Sidebar } from "lucide-react";

export function WorkspaceHeader({
  icon,
  title,
  onTitleClick,
}: {
  icon: React.ReactNode;
  title: string;
  onTitleClick: () => void;
}) {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const slug = location.workspace;

  const { data: workspace } = engine.ubento.workspace.useWorkspaceBySlug(
    { slug: slug! },
    { enabled: !!slug },
  );

  function handleSidebarClick() {
    engine.setState((state) => ({
      ...state,
      leftPanelPinned: !state.leftPanelPinned,
    }));
  }

  return (
    <div className="flex gap-1 p-3">
      <Button
        variant="ghost"
        style={{ padding: "0 8px", flexGrow: 1 }}
        align="start"
        onClick={onTitleClick}
      >
        {icon}
        <span className="truncate text-sm font-medium">{title}</span>
      </Button>
      <Button
        size="icon"
        onClick={() =>
          engine.goToLocation({
            workspace: undefined,
            board: undefined,
            component: undefined,
          })
        }
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
