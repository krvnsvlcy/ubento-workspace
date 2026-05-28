import { useUbentoEngine } from "@/hooks/app-engine";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { ComponentConsole } from "./console";
import { ComponentEngine } from "./engine";

export function ComponentPreview({ engine }: { engine: ComponentEngine }) {
  const ubentoEngine = useUbentoEngine();
  const [width, setWidth] = useState<number | string>("100%");
  const [height, setHeight] = useState<number | string>("auto");

  const resetSize = () => {
    setWidth("100%");
    setHeight("auto");
  };

  return (
    <div className="flex-1 h-full bg-neutral-border/10 flex flex-col min-w-0">
      {/* Preview Header / Controls */}
      <div className="h-10 px-4 border-b border-neutral-border bg-neutral-surface/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
            Preview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-surface-hover rounded-md border border-neutral-border px-2 py-0.5">
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-12 bg-transparent text-[10px] font-bold text-center outline-none text-neutral-content"
              placeholder="Width"
            />
            <span className="text-[10px] text-neutral-content-muted">×</span>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-12 bg-transparent text-[10px] font-bold text-center outline-none text-neutral-content"
              placeholder="Height"
            />
          </div>
          <button
            onClick={resetSize}
            className="p-1.5 rounded-md text-neutral-content-muted hover:bg-neutral-surface-hover hover:text-neutral-content transition-all"
            title="Reset to full size"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* Viewport Area */}
        <div className="flex-1 relative overflow-auto bg-neutral-border/5 flex items-center justify-center p-12 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
          <div
            className="transition-all duration-300 ease-out border border-neutral-border/50 overflow-hidden bg-white/50 backdrop-blur-sm rounded-md"
            style={{
              width: typeof width === "number" ? `${width}px` : width,
              height: typeof height === "number" ? `${height}px` : height,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <iframe
              src={ubentoEngine.componentRuntimeUrl}
              onLoad={(e) => {
                if (e.currentTarget.contentWindow) {
                  engine.init(e.currentTarget.contentWindow);
                }
              }}
              style={{
                height: "100%",
                width: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
        <ComponentConsole engine={engine} />
      </div>
    </div>
  );
}
