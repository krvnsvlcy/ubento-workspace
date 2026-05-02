import { PendingView } from "@ubento/bento-primitives";
import { Workspace, type BentoEngine } from "@ubento/engine";

export function GuestWorkspace({ engine }: { engine: BentoEngine }) {
  const workspace = engine.useState((s) => s.workspace);
  let content: React.ReactNode;

  if (!workspace) {
    content = <PendingView message="Loading Workspace..." />;
  } else {
    content = <Workspace engine={engine} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        transition: "padding 0.2s",
      }}
    >
      {content}
    </div>
  );
}
