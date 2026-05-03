import { useUbentoEngine } from "../../../engine/engine";
import { Workspace } from "../../views/workspace/workspace";
import { ComponentMain } from "./component/component-main";

export function Main() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      {/* Workspace view (kept rendered to avoid iframe reloads) */}
      {location.workspace && (
        <div
          className="absolute inset-0"
          style={{
            visibility: location.component ? "hidden" : undefined,
            pointerEvents: location.component ? "none" : undefined,
          }}
        >
          <Workspace key={location.workspace} slug={location.workspace} />
        </div>
      )}

      {/* Component editor view (superposed) */}
      {location.component && (
        <div className="absolute inset-0 z-10">
          <ComponentMain componentId={location.component} />
        </div>
      )}

      {/* Empty state */}
      {!location.workspace && !location.component && (
        <div className="flex flex-col h-full w-full items-center justify-center opacity-20">
          <p className="text-sm font-medium uppercase tracking-widest">
            Canvas
          </p>
        </div>
      )}
    </div>
  );
}
