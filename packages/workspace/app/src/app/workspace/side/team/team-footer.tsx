import { useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  Popper,
  PopperContext,
  PopperProvider,
  PopperTrigger,
} from "@ubento/bento.arlo-core";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { useContext } from "react";

export function TeamFooter() {
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
    <div className="p-3">
      <PopperProvider>
        <PopperTrigger>
          <div className="p-1 rounded-xl bg-content/0 hover:bg-content/5 text-content-subtle hover:text-content transition-colors cursor-pointer flex gap-2 text-sm text-content min-w-0 items-center">
            <div className="size-7 rounded-md bg-content/10 flex items-center justify-center shrink-0">
              {session?.picture ? (
                <img
                  src={session.picture}
                  alt={session.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <User size={14} />
              )}
            </div>
            <span className="truncate text-sm font-medium grow overflow-hidden">
              {session?.name}
            </span>
            <div className="px-1">
              <ChevronsUpDown size={16} />
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
          offset={12}
        >
          <TeamFooterMenu open={open} handleLogout={handleLogout} />
        </Popper>
      </PopperProvider>
    </div>
  );
}

function TeamFooterMenu({
  open,
  handleLogout,
}: {
  open: (path: string) => void;
  handleLogout: () => void;
}) {
  const context = useContext(PopperContext);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    context?.setIsOpen(false);
  };

  return (
    <Menu className="w-56 p-2 flex flex-col gap-1">
      <MenuItem
        onClick={() => handleItemClick(() => open(appModalRoutes.team.root))}
      >
        <Settings size={14} />
        Team Settings
      </MenuItem>
      <MenuItem
        onClick={() => handleItemClick(() => open(appModalRoutes.account.root))}
      >
        <User size={14} />
        Account Settings
      </MenuItem>
      <MenuSeparator />
      <MenuItem
        variant="destructive"
        onClick={() => handleItemClick(handleLogout)}
      >
        <LogOut size={14} />
        Logout
      </MenuItem>
    </Menu>
  );
}
