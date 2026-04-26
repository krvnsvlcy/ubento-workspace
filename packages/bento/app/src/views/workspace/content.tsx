import { ErrorView } from "@/components/error";
import { useBentoHost } from "@/contexts/host";
import { useRef, useState } from "react";
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
  const state = useStore(controller);
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inspectorWidth, setInspectorWidth] = useState(320);

  const [isNavPinned, setIsNavPinned] = useState(() => {
    return localStorage.getItem("ubento:nav-pinned") === "true";
  });

  const toggleNavPinned = () => {
    setIsNavPinned((prev) => {
      const next = !prev;
      localStorage.setItem("ubento:nav-pinned", String(next));
      return next;
    });
  };

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
          controller.getState().connect(iframeRef.current.contentWindow);
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
    <div className="h-screen w-screen relative overflow-hidden bg-background">
      <SideSplitView
        side={{
          edge: "right",
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
        <div className="h-full w-full relative flex flex-col">
          <WorkspaceNavigation
            controller={controller}
            isPinned={isNavPinned}
            onTogglePinned={toggleNavPinned}
          />
          <div className="flex-1 relative">{engine}</div>
        </div>
      </SideSplitView>
    </div>
  );
}
