import { useUbentoEngine } from "../../../../../engine/engine";

export function WorkspaceItem({ workspace }: { workspace: any }) {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const isActive = location.workspace === workspace.slug;

  return (
    <button
      onClick={() => engine.openWorkspace(workspace.slug)}
      className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 text-[13px] transition-all ${
        isActive
          ? "bg-accent/10 text-accent font-medium"
          : "text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content"
      }`}
    >
      <div className="w-5 h-5 rounded bg-neutral-border flex items-center justify-center text-[10px] text-neutral-content-muted font-bold">
        {workspace.name.charAt(0)}
      </div>
      <span className="truncate">{workspace.name}</span>
    </button>
  );
}
