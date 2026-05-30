import { Code, Columns, Eye, Save } from "lucide-react";
import { ComponentEngine } from "./engine";

interface ComponentEditorHeaderProps {
  engine: ComponentEngine;
  componentName: string;
}

export function ComponentEditorHeader({
  engine,
  componentName,
}: ComponentEditorHeaderProps) {
  const viewMode = engine.useState((s) => s.viewMode);
  return (
    <div className="h-12 px-4 border-b border-border flex items-center justify-between bg-surface/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-base/10 flex items-center justify-center text-base">
            <Code size={12} />
          </div>
          <span className="text-[13px] font-semibold text-content truncate max-w-[200px]">
            {componentName}
          </span>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center p-1 bg-surface-hover rounded-lg border border-border">
        <button
          onClick={() => engine.setViewMode("code")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
            viewMode === "code"
              ? "bg-surface shadow-sm text-base"
              : "text-content-muted hover:text-content"
          }`}
        >
          <Code size={14} />
          Code
        </button>
        <button
          onClick={() => engine.setViewMode("split")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
            viewMode === "split"
              ? "bg-surface shadow-sm text-base"
              : "text-content-muted hover:text-content"
          }`}
        >
          <Columns size={14} />
          Split
        </button>
        <button
          onClick={() => engine.setViewMode("preview")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
            viewMode === "preview"
              ? "bg-surface shadow-sm text-base"
              : "text-content-muted hover:text-content"
          }`}
        >
          <Eye size={14} />
          Preview
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => engine.save()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-base text-contrast text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all"
        >
          <Save size={12} fill="currentColor" />
          Save
        </button>
      </div>
    </div>
  );
}
