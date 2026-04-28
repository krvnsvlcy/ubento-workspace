import { PendingView } from "@ubento/bento-primitives";
import { Workspace } from "@ubento/engine";
import { useStore } from "zustand";
import { createEngine } from "./engine.js";
import { useKeyboardController } from "./keyboard.js";

const engine = createEngine();
const searchParams = new URLSearchParams(window.location.search);
const editPaddingSize = searchParams.get("editPaddingSize");

export function GuestWorkspace() {
  const workspace = useStore(engine, (state) => state.workspace);
  const isEditMode = useStore(engine, (state) => state.mode === "edit");
  useKeyboardController(engine);

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
