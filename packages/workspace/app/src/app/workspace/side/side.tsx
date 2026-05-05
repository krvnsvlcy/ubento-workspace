import { useUbentoEngine } from "../../../engine/engine";
import { SideHeader } from "./header";
import { WorkspaceSide } from "./workspace-side";
import { ComponentSide } from "./component-side";

export function Side() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  return (
    <div className="h-full flex flex-col bg-neutral-surface border-r border-neutral-border overflow-hidden select-none">
      <SideHeader />
      {location.component ? <ComponentSide /> : <WorkspaceSide />}
    </div>
  );
}
