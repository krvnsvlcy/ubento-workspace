import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ubento/workspace.primitives";
import { Building2, LogOut, Settings, Sidebar, User } from "lucide-react";
import { useGlobalModals } from "../../../../contexts/modals";
import { useUbentoEngine } from "../../../../engine/app/engine";

export function WorkspaceHeader() {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  const { openModal } = useGlobalModals();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  function handleSidebarClick() {
    engine.setState((state) => ({
      ...state,
      leftPanelPinned: !state.leftPanelPinned,
    }));
  }

  return (
    <div className="px-3 flex gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-1 grow rounded-lg hover:bg-neutral-surface-hover transition-colors cursor-pointer flex gap-2 text-sm text-neutral-content min-w-0">
            <div className="w-6 h-6 rounded-md bg-neutral-content/10 flex items-center justify-center shrink-0">
              <Building2 size={14} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-sm font-medium">
                {team?.name || "Team"}
              </span>
              <span className="truncate text-xs text-neutral-content-muted">
                {session?.email}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => openModal("team")}>
            <Settings size={14} className="mr-2" />
            <span>Team Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openModal("account")}>
            <User size={14} className="mr-2" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            <LogOut size={14} className="mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="icon" onClick={handleSidebarClick} variant="ghost">
        <Sidebar size={14} />
      </Button>
    </div>
  );
}
