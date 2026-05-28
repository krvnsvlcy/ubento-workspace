import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Popper, PopperMenu, PopperProvider, PopperTrigger } from "@ubento/bento.arlo-core";
import { LogOut, Settings, User } from "lucide-react";
import { useUbentoEngine } from "@/hooks/app-engine";

export function WorkspaceFooter() {
  const { push: open } = useAppModal();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

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
                    label: "Team Settings",
                    icon: <Settings size={14} />,
                    onClick: () => open(appModalRoutes.team.root),
                  },
                  {
                    label: "Account Settings",
                    icon: <User size={14} />,
                    onClick: () => open(appModalRoutes.account.root),
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
