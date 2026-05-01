import { Settings } from "lucide-react";
import { useUbentoEngine } from "../../../engine/engine";

export function SideHeader() {
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);

  return (
    <div className="p-4 border-b border-neutral-border flex items-center justify-between bg-neutral-surface/50 select-none">
      <div className="flex items-center gap-2 font-semibold text-sm text-neutral-content">
        <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[11px] text-accent-contrast">
          {session?.name?.charAt(0) || "T"}
        </div>
        <span className="truncate">{session?.name || "Team"}</span>
      </div>
      <button className="text-neutral-content-muted hover:text-neutral-content transition-colors p-1 hover:bg-neutral-surface-hover rounded">
        <Settings size={14} />
      </button>
    </div>
  );
}
