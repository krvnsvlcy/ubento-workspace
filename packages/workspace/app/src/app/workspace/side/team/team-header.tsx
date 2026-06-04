import { useUbentoEngine } from "@/hooks/app-engine";
import { Button } from "@ubento/bento.arlo-core";
import { Home, Sidebar } from "lucide-react";

export function WorkspaceHeader({
  icon,
  title,
  onTitleClick,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onTitleClick: () => void;
}) {
  const engine = useUbentoEngine();
  const userSettings = engine.userSetting.useState((s) => s.data);
  const updateSettings = engine.userSetting.update;

  function handleSidebarClick() {
    updateSettings({
      sidePanelPinned: !userSettings.sidePanelPinned,
    });
  }

  return (
    <div className="flex gap-1 p-3">
      <Button
        variant="ghost"
        style={{ padding: "0 8px", flexGrow: 1, overflow: "hidden" }}
        align="start"
        onClick={onTitleClick}
      >
        {icon}
        <span className="truncate text-sm font-medium">{title}</span>
      </Button>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          onClick={() =>
            engine.goToLocation({
              view: "home",
              params: {},
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
    </div>
  );
}
