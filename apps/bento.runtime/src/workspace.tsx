import { PendingView } from "@ubento/bento-primitives";
import { createBentoEngine, Workspace } from "@ubento/engine";
import { useKeyboardController } from "./keyboard";
import { rpc } from "./rpc";

const engine = createBentoEngine({ rpc });
const searchParams = new URLSearchParams(window.location.search);
const editPaddingSize = searchParams.get("editPaddingSize");

export function GuestWorkspace() {
  const workspace = engine.useState((s) => s.workspace);
  const isEditMode = engine.useState((s) => s.mode === "edit");
  useKeyboardController({ engine });

  let content: React.ReactNode;

  if (!workspace) {
    content = <PendingView message="Loading Workspace..." />;
  } else {
    content = <Workspace engine={engine} />;
  }

  return (
    <div
      style={
        {
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          "--root-padding": isEditMode ? editPaddingSize : undefined,
          transition: "padding 0.2s",
        } as React.CSSProperties
      }
    >
      {content}
    </div>
  );
}
