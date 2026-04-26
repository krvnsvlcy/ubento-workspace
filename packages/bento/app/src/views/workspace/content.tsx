import { ErrorView } from "@/components/error";
import { useBentoHost } from "@/contexts/host";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { WorkspaceController } from "./controller.js";

export function WorkspaceContent({
  workspace,
  controller,
}: {
  workspace?: any;
  controller: WorkspaceController;
}) {
  const state = useSnapshot(controller.state);
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (state.error || (!workspace && !state.loading)) {
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

  return (
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
}
