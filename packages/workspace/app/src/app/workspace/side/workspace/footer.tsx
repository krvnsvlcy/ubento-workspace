import { AccountModal } from "@/modals/account/account";
import { TeamModal } from "@/modals/team/team_modal";
import { useModal } from "@/utils/modal-store";
import {
  Popper,
  PopperMenu,
  PopperProvider,
  PopperTrigger,
} from "@ubento/workspace.primitives";
import { LogOut, Settings, User, Palette } from "lucide-react";
import { useUbentoEngine } from "../../../../engine/app/engine";

export function WorkspaceFooter() {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  const { open } = useModal();

  const handleLogout = () => {
    window.location.href = "/auth/logout";
  };

  return (
    <div className="px-3 flex gap-1">
      <PopperProvider>
        <PopperTrigger>
          <div className="p-1 grow rounded-lg hover:bg-neutral-surface-hover transition-colors cursor-pointer flex gap-2 text-sm text-neutral-content min-w-0">
            <div className="w-6 h-6 rounded-md bg-neutral-content/10 flex items-center justify-center shrink-0">
              {session?.picture ? (
                <img
                  src={session.picture}
                  alt={session.name}
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <User size={14} />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-sm font-medium">
                {session?.name}
              </span>
            </div>
          </div>
        </PopperTrigger>
        <Popper
          position="top"
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
                    label: "Appearance",
                    icon: <Palette size={14} />,
                    onClick: () => {
                      engine.goToLocation({ style: true });
                      // Close menu automatically after navigation? The popper might auto-close or we just let it be.
                    },
                  },
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
    </div>
  );
}
