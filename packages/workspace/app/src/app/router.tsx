import { Workspace } from "@/app/views/workspace/workspace";
import { useUbentoEngine } from "../engine/engine";

export function Router() {
  const ubento = useUbentoEngine();
  const location = ubento.useState((s) => s.location);

  return (
    <div
      className="bg-background"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Workspace
        slug={location.params.slug}
        boardId={location.params.boardId}
      />
    </div>
  );
}
