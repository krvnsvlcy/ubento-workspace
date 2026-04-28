import { ErrorView } from "@/components/error";
import { useBentoHost } from "@/contexts/host";
import { useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import { SideSplitView } from "./components/split-view.js";
import { WorkspaceController } from "./controller.js";
import { WorkspaceNavigation } from "./interactor/navigation.js";
import { ControlPanel } from "./panels/control-panel";

export function WorkspaceContent({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const isEditMode = useStore(controller, (state) => state.mode === "edit");
  const background = useStore(controller, (state) => {
    const activeBoardId = state.location?.boardId;
    const boardData = activeBoardId ? state.boards[activeBoardId] : null;
    return boardData?.style?.background;
  });
  const state = useStore(controller);
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inspectorWidth, setInspectorWidth] = useState(320);

  if (state.error) {
    return (
      <ErrorView
        message={"Error Loading Workspace"}
        action={{
          label: "Retry",
          handler: () => window.location.reload(),
        }}
      />
    );
  }

  const iframeUrl = useMemo(() => {
    const url = new URL(host.iframeUrl);
    url.searchParams.set("editPaddingSize", "6px");
    return url.toString();
  }, [host.iframeUrl]);

  const engine = (
    <iframe
      ref={iframeRef}
      src={iframeUrl}
      onLoad={() => {
        if (iframeRef.current?.contentWindow) {
          controller.getState().connect(iframeRef.current.contentWindow);
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
          background: isEditMode
            ? `color-mix(in srgb, #0f172a 40%, ${background})`
            : background,
          transition: "background 0.3s ease-in-out, padding 0.2s ease-in-out",
          "--page-background": background,
        } as any
      }
    >
      <SideSplitView
        side={{
          edge: "right",
          content:
            state.mode === "edit" ? (
              <ControlPanel controller={controller} />
            ) : null,
          size: state.mode === "edit" ? inspectorWidth : 0,
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
            {engine}
          </div>
        </div>
      </SideSplitView>
    </div>
  );
}
