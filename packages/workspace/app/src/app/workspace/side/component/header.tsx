import { ArrowLeft, Settings } from "lucide-react";
import { useUbentoEngine } from "@/hooks/app-engine";

export function ComponentHeader() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-surface/50 select-none">
      <div className="flex items-center gap-2 font-semibold text-sm text-content">
        <button
          onClick={() =>
            engine.goToLocation({ ...location, component: undefined })
          }
          className="w-6 h-6 rounded hover:bg-surface-hover flex items-center justify-center text-content-muted hover:text-content transition-colors"
        >
          <ArrowLeft size={14} />
        </button>
        <span className="truncate">Component</span>
      </div>
      <button className="text-content-muted hover:text-content transition-colors p-1 hover:bg-surface-hover rounded">
        <Settings size={14} />
      </button>
    </div>
  );
}
