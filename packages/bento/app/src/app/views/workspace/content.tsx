import { ErrorView } from "@/app/components/error.js";
import { useUbentoEngine } from "@/engine/engine";
import { useMemo, useRef } from "react";
import { WorkspaceEngine } from "./engine.js";
import { WorkspaceNavigation } from "./interactor/navigation.js";

export function WorkspaceContent({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const error = controller.useState((state) => state.error);
  const host = useUbentoEngine();
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      className="h-full w-full relative overflow-hidden flex flex-col bg-background"
      onClick={() => {
        controller.select([]);
      }}
    >
      <WorkspaceNavigation controller={controller} />
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
