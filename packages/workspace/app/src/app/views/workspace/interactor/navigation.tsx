import { ThemeSelector } from "@/app/components/ThemeSelector.js";
import { UserButton } from "@/app/components/user-button.js";
import { useTheme } from "@/contexts/theme.js";
import { useUbentoEngine } from "@/engine/engine";
import { IconButton } from "@ubento/workspace.primitives";
import { Eye, PanelLeft, Pencil } from "lucide-react";
import { WorkspaceEngine } from "../engine/engine.js";

export function WorkspaceNavigation({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const host = useUbentoEngine();
  const snap = controller.useState();
  const theme = useTheme();

  const activeBoard = Object.values(snap.boards).find(
    (b) => b.id === snap.location?.boardId,
  );

  return (
    <div className="flex h-11 w-full items-center justify-between px-4 transition-all">
      <div className="flex items-center gap-2 overflow-hidden">
        {!snap.leftPanelOpen && (
          <IconButton
            onClick={() => controller.toggleLeftPanel()}
            icon={<PanelLeft className="h-4 w-4 text-neutral-content-muted" />}
            className="mr-1"
          />
        )}
        <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-content truncate">
          {activeBoard?.name || snap.workspace?.name}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            controller.setMode(snap.mode === "edit" ? "live" : "edit")
          }
          className={`flex h-7 items-center gap-2 rounded-lg px-3 text-[12px] font-medium transition-all ${
            snap.mode === "edit"
              ? "bg-accent text-accent-contrast"
              : "text-neutral-content-muted hover:bg-neutral-surface-hover hover:text-neutral-content"
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
  );
}
