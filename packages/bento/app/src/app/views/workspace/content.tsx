import { ErrorView } from "@/app/components/error.js";
import { useUbentoEngine } from "@/engine/engine";
import { useMemo, useRef, useState } from "react";
import { SideSplitView } from "./components/split-view.js";
import { WorkspaceEngine } from "./engine.js";
import { WorkspaceNavigation } from "./interactor/navigation.js";
import { ControlPanel } from "./panels/control-panel";

export function WorkspaceContent({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const isEditMode = controller.useState((state) => state.mode === "edit");
  const error = controller.useState((state) => state.error);
  const host = useUbentoEngine();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inspectorWidth, setInspectorWidth] = useState(320);

  const iframeUrl = useMemo(() => {
    const url = new URL(host.workspaceRuntimeUrl);
    url.searchParams.set("editPaddingSize", "6px");
    return url.toString();
  }, [host.workspaceRuntimeUrl]);

  if (error) {
    return (
      <ErrorView
        message={"Error Loading Workspace"}
        details={<p>{String(error)}</p>}
        action={{
          label: "Retry",
          handler: () => window.location.reload(),
        }}
      />
    );
  }

  const content = (
    <iframe
      ref={iframeRef}
      src={iframeUrl}
      onLoad={() => {
        if (iframeRef.current?.contentWindow) {
          controller.connect(iframeRef.current.contentWindow);
        }
      }}
      className="rounded-2xl"
      style={{
        height: "100%",
        width: "100%",
        border: "none",
        outline: "none",
        overflow: "hidden",
      }}
    />
  );

  return (
    <div
      className="h-screen w-screen relative overflow-hidden"
      style={
        {
          padding: isEditMode ? "6px" : "0px",
          transition: "padding 0.2s ease-in-out",
        } as any
      }
      onClick={() => {
        controller.select([]);
      }}
    >
      <SideSplitView
        side={{
          edge: "right",
          content: isEditMode ? <ControlPanel controller={controller} /> : null,
          size: isEditMode ? inspectorWidth : 0,
          onSizeChange: setInspectorWidth,
          minSize: 240,
          maxSize: 600,
        }}
      >
        <div className="h-full w-full relative flex flex-col">
          <WorkspaceNavigation controller={controller} />
          <div
            className="flex-1 relative"
            style={{
              padding: isEditMode ? 6 : 0,
              transition: "padding 0.2s ease-in-out",
            }}
          >
            {content}
          </div>
        </div>
      </SideSplitView>
    </div>
  );
}
