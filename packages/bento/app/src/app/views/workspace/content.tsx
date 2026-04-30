import { ErrorView } from "@/app/components/error.js";
import { useUbentoEngine } from "@/engine/engine";
import { useMemo, useRef, useState } from "react";
import { SideSplitView } from "./components/split-view.js";
import { WorkspaceEngine } from "./engine.js";
import { WorkspaceNavigation } from "./interactor/navigation.js";
import { NavigationPanel } from "./panels/navigation-panel.js";

export function WorkspaceContent({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const leftPanelOpen = controller.useState((state) => state.leftPanelOpen);
  const error = controller.useState((state) => state.error);
  const host = useUbentoEngine();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(240);

  const iframeUrl = useMemo(() => {
    const url = new URL(host.workspaceRuntimeUrl);
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
      style={{
        height: "100%",
        width: "100%",
        border: "none",
        outline: "none",
      }}
    />
  );

  return (
    <div
      className="h-screen w-screen relative overflow-hidden flex bg-background"
      onClick={() => {
        controller.select([]);
      }}
    >
      <SideSplitView
        left={{
          content: leftPanelOpen ? (
            <NavigationPanel controller={controller} />
          ) : null,
          size: leftPanelOpen ? leftPanelWidth : 0,
          onSizeChange: setLeftPanelWidth,
          minSize: 200,
          maxSize: 400,
        }}
        gap={0}
      >
        <div className="flex flex-col h-full w-full bg-background overflow-hidden">
          <WorkspaceNavigation controller={controller} />
          <div className="flex-1 overflow-hidden">{content}</div>
        </div>
      </SideSplitView>
    </div>
  );
}
