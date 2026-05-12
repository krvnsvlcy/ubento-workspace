import { AccountModal } from "@/modals/account/account";
import { TeamModal } from "@/modals/team/team_modal";
import { useModal } from "@/utils/modal-store";
import {
  Button,
  Popper,
  PopperMenu,
  PopperMenuOption,
  PopperProvider,
  PopperTrigger,
} from "@ubento/workspace.primitives";
import {
  Building2,
  LogOut,
  Palette,
  Settings,
  Sidebar,
  User,
} from "lucide-react";
import { useUbentoEngine } from "../../../../engine/app/engine";

export function WorkspaceHeader() {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  const { open } = useModal();

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
      <PopperProvider>
        <PopperTrigger>
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
        </PopperTrigger>
        <Popper
          position="bottom"
          align="start"
          exclusive
          filled
          border
          shadow
          offset={4}
        >
          <div className="w-56">
            <PopperMenu
              options={[
                [
                  {
                    label: "Team Settings",
                    icon: <Settings size={14} />,
                    onClick: () => open(TeamModal, { team }),
                  },
                  {
                    label: "Account Settings",
                    icon: <User size={14} />,
                    onClick: () => open(AccountModal, { user: session }),
                  },
                ],
                [
                  {
                    label: "Logout",
                    icon: <LogOut size={14} />,
                    onClick: handleLogout,
                    destructive: true,
                  },
                ],
              ]}
            />
          </div>
        </Popper>
      </PopperProvider>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => engine.goToLocation({ style: true })}
      >
        <Palette size={14} />
      </Button>
      <Button size="icon" onClick={handleSidebarClick} variant="ghost">
        <Sidebar size={14} />
      </Button>
    </div>
  );
}
