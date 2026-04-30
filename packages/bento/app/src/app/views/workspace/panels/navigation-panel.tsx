import { Home, LayoutDashboard, PanelLeft, Plus, Trash2 } from "lucide-react";
import { useUbentoEngine } from "@/engine/engine";
import { WorkspaceEngine } from "../engine";
import { Section } from "./shared";

export function NavigationPanel({ controller }: { controller: WorkspaceEngine }) {
  const host = useUbentoEngine();
  const state = controller.useState();
  const boards = Object.values(state.boards);

  return (
    <div className="h-full flex flex-col bg-neutral-surface/20 border-r overflow-hidden">
      <div className="flex flex-col gap-0.5 p-2">
        <div className="flex items-center justify-between px-3 py-2 mb-2">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center text-[10px] text-accent-contrast">
              {state.workspace?.name?.charAt(0)}
            </div>
            <span className="truncate">{state.workspace?.name}</span>
          </div>
          <button
            onClick={() => controller.toggleLeftPanel()}
            className="text-neutral-content-muted hover:text-neutral-content p-1 hover:bg-neutral-surface-hover rounded transition-all"
          >
            <PanelLeft size={14} />
          </button>
        </div>

        <button
          onClick={() => host.goToLocation({ view: "home", params: {} })}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-1.5 text-[13px] text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content transition-all"
        >
          <Home size={16} />
          <span>Home</span>
        </button>
        <button
          onClick={() =>
            host.goToLocation({
              view: "workspace",
              params: { slug: state.workspace?.slug! },
            })
          }
          className="flex items-center gap-3 w-full rounded-lg px-3 py-1.5 text-[13px] text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content transition-all"
        >
          <LayoutDashboard size={16} />
          <span>Workspace</span>
        </button>
      </div>

      <div className="mt-4 flex-1 overflow-auto">
      <Section title="Boards" icon={LayoutDashboard}>
        <div className="flex flex-col gap-1 p-2">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => controller.goTo(board.id)}
              className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all cursor-pointer ${
                state.location?.boardId === board.id
                  ? "bg-accent/10 text-accent font-medium shadow-sm"
                  : "text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content"
              }`}
            >
              <span className="truncate">{board.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete board "${board.name}"?`)) {
                    controller.deleteBoard(board.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 text-neutral-content-subtle hover:text-destructive transition-all p-1"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}

          <button
            onClick={() => controller.createBoard({ name: "New Board" })}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-content-muted transition-all hover:bg-neutral-surface-hover hover:text-accent"
          >
            <Plus size={14} />
            <span>New Board</span>
          </button>
        </div>
      </Section>
      </div>
    </div>
  );
}
