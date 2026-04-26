import { ErrorView } from "@/components/error";
import { useBentoHost } from "@/contexts/host";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { SideSplitView } from "./components/split-view.js";
import { WorkspaceController } from "./controller.js";
import { WorkspaceNavigation } from "./interactor/navigation.js";
import { ControlPanel } from "./panels/control-panel";

export function WorkspaceContent({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useSnapshot(controller.state);
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

  const engine = (
    <iframe
      ref={iframeRef}
      src={host.iframeUrl}
      onLoad={() => {
        if (iframeRef.current?.contentWindow) {
          controller.connect(iframeRef.current.contentWindow);
        }
      }}
      style={{
        height: "100%",
        width: "100%",
        border: "none",
        outline: "none",
      }}
    />
  );

  return (
    <div className="h-screen w-screen relative">
      <SideSplitView
        side={{
          type: "right",
          content:
            state.context.mode === "edit" ? (
              <ControlPanel controller={controller} />
            ) : null,
          size: state.context.mode === "edit" ? inspectorWidth : 0,
          onSizeChange: setInspectorWidth,
          minSize: 240,
          maxSize: 600,
        }}
      >
        <div className="h-full w-full relative">
          <WorkspaceNavigation controller={controller} />
          {engine}
        </div>
      </SideSplitView>
    </div>
  );
}
