import { ErrorView } from "@/app/components/error.js";
import { useUbentoEngine } from "@/engine/engine";
import { PendingView } from "@ubento/workspace.primitives";
import { WorkspaceEngine } from "./engine/engine.js";

function WorkspaceOverlay({ engine }: { engine: WorkspaceEngine }) {
  const workspaceName = engine.useState((state) => state.workspace.title);
  const workspaceSlug = engine.useState((state) => state.workspace.slug);
  const runtimeStatus = engine.useState((state) => state.status);

  if (runtimeStatus === "ready") {
    return <></>;
  }

  let content = <></>;

  if (runtimeStatus === "error") {
    content = <ErrorView message="Failed to load workspace" />;
  } else {
    content = (
      <PendingView message={workspaceName || workspaceSlug || "Workspace"} />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1000,
      }}
      className="bg-background"
    >
      {content}
    </div>
  );
}

export function WorkspaceContent({ engine }: { engine: WorkspaceEngine }) {
  const ubentoEngine = useUbentoEngine();
  return (
    <div className="h-full w-full relative overflow-hidden">
      <iframe
        src={ubentoEngine.workspaceRuntimeUrl}
        key={engine.id}
        onLoad={(e) => {
          if (e.currentTarget.contentWindow) {
            engine.init(e.currentTarget.contentWindow);
          }
        }}
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          outline: "none",
        }}
      />

      <WorkspaceOverlay engine={engine} />
    </div>
  );
}
