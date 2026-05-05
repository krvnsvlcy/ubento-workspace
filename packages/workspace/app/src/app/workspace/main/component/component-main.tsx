import { SplitView } from "@/app/workspace/main/workspace/components/split-view";
import { useEffect, useMemo } from "react";
import { useUbento } from "../../../../engine/engine";
import { ComponentCodeEditor } from "./editor";
import { createComponentEngine } from "./engine";
import { ComponentEditorHeader } from "./header";
import { ComponentPreview } from "./preview";

export function ComponentMain({ componentId }: { componentId: string }) {
  const ubento = useUbento();
  const componentEngine = useMemo(
    () => createComponentEngine({ componentId, ubento }),
    [componentId, ubento],
  );

  const { status, module, splitPosition, error } = componentEngine.useState(
    (s) => ({
      status: s.status,
      viewMode: s.viewMode,
      module: s.module,
      splitPosition: s.splitPosition,
      error: s.error,
    }),
  );

  useEffect(() => {
    return () => componentEngine.dispose();
  }, [componentEngine]);

  if (status === "pending") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-surface text-neutral-content-muted text-[11px] animate-pulse">
        Loading component...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-neutral-surface text-red-500 text-[11px]">
        Failed to load component.
        <pre>{String(error)}</pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-neutral-surface overflow-hidden">
      <ComponentEditorHeader
        engine={componentEngine}
        componentName={module?.name || componentId.split("-")[0]}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex relative">
        <SplitView
          left={<ComponentCodeEditor engine={componentEngine} />}
          right={<ComponentPreview engine={componentEngine} />}
          position={splitPosition}
          onChange={(pos) => componentEngine.setSplitPosition(pos)}
          minPosition={0}
          maxPosition={100}
        />
      </div>
    </div>
  );
}
