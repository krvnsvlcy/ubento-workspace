import { ThemeSelector } from "@/app/components/ThemeSelector.js";
import { UserButton } from "@/app/components/user-button.js";
import { useUbentoEngine } from "@/engine/engine";
import { useTheme } from "@/contexts/theme.js";
import { IconButton } from "@ubento/bento-primitives";
import { Eye, Home, LayoutDashboard, Pencil } from "lucide-react";
import { useStore } from "zustand";
import { WorkspaceController } from "../controller.js";

export function WorkspaceNavigation({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const host = useUbentoEngine();
  const snap = useStore(controller);
  const theme = useTheme();

  return (
    <div className="relative z-[200] w-full p-1.5">
      <div
        className={`mx-auto flex h-14 w-full items-center justify-between px-4 transition-all rounded-2xl bg-background/70`}
        style={{
          background: "var(--page-background)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => host.goToLocation({ view: "home", params: {} })}
              icon={<Home className="h-4 w-4" />}
            />
            <IconButton
              onClick={() =>
                host.goToLocation({
                  view: "workspace",
                  params: { slug: snap.workspace?.slug! },
                })
              }
              icon={<LayoutDashboard className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-3">{snap.workspace?.name}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => snap.setMode(snap.mode === "edit" ? "live" : "edit")}
            className={`flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-all ${
              snap.mode === "edit"
                ? "bg-accent text-accent-contrast shadow-lg shadow-accent/20"
                : "bg-neutral-surface text-neutral-content-subtle hover:bg-neutral-surface-hover"
            }`}
          >
            {snap.mode === "edit" ? (
              <>
                <Pencil className="h-3.5 w-3.5" />
                <span>Editing</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Live</span>
              </>
            )}
          </button>
          <ThemeSelector
            currentTheme={theme.currentTheme}
            isThemeOpen={theme.isThemeOpen}
            setIsThemeOpen={theme.setIsThemeOpen}
            onChangeTheme={theme.changeTheme}
          />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
