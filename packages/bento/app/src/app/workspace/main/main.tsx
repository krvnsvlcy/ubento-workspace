import { useUbentoEngine } from "../../../engine/engine";
import { Workspace } from "../../views/workspace/workspace";

export function Main() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  if (location.workspace) {
    return (
      <Workspace
        key={location.workspace}
        slug={location.workspace}
        boardId={location.board}
      />
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      <div className="flex-1 overflow-hidden flex items-center justify-center opacity-20">
        <p className="text-sm font-medium uppercase tracking-widest">Canvas</p>
      </div>
    </div>
  );
}
