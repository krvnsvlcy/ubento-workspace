import { ErrorView } from "@/app/components/error.js";
import { bentoModuleType } from "@/app/dnd";
import { useUbentoEngine } from "@/engine/engine";
import {
  BrowserDataTransferStore,
  DataTransferPayload,
} from "@ubento/data-transfer";
import { PendingView } from "@ubento/workspace.primitives";
import { useState } from "react";
import { WorkspaceEngine } from "./engine/engine.js";

function WorkspaceOverlay({ engine }: { engine: WorkspaceEngine }) {
  const runtimeStatus = engine.useState((state) => state.runtimeStatus);
  const workspaceStatus = engine.useState((state) => state.workspaceStatus);

  if (runtimeStatus === "ready" && workspaceStatus === "loaded") {
    return <></>;
  }

  let content = <></>;

  if (workspaceStatus === "error") {
    content = <ErrorView message="Failed to load workspace" />;
  } else {
    content = <PendingView message="Loading workspace..." />;
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

function DropZone({
  id,
  rect,
  engine,
}: {
  id: string;
  rect: any;
  engine: WorkspaceEngine;
}) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const payload = new DataTransferPayload(
          new BrowserDataTransferStore(e.dataTransfer),
        );
        const data = payload.getData(bentoModuleType);
        if (data) {
          engine.performDrop(id, [{ type: "module", ref: data.ref }]);
        }
      }}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: isOver
          ? "rgba(59, 130, 246, 0.2)"
          : "rgba(59, 130, 246, 0.1)",
        border: isOver
          ? "2px solid rgba(59, 130, 246, 0.8)"
          : "2px dashed rgba(59, 130, 246, 0.4)",
        borderRadius: "4px",
        transition: "all 0.2s ease",
        pointerEvents: "auto",
      }}
    />
  );
}

function DropGlass({ engine }: { engine: WorkspaceEngine }) {
  const ubento = useUbentoEngine();
  const dragActive = ubento.useState((s) => s.dragActive);
  const dropRects = engine.useState((s) => s.dropRects);

  if (!dragActive) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 500,
        pointerEvents: "none",
      }}
    >
      {dropRects.map((dr) => (
        <DropZone key={dr.id} id={dr.id} rect={dr.rect} engine={engine} />
      ))}
    </div>
  );
}

export function WorkspaceContent({ engine }: { engine: WorkspaceEngine }) {
  const ubentoEngine = useUbentoEngine();
  return (
    <div className="h-full w-full relative overflow-hidden">
      <iframe
        src={ubentoEngine.workspaceRuntimeUrl}
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
      <DropGlass engine={engine} />
    </div>
  );
}
