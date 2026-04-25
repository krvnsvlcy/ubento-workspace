import { ErrorView } from "@/components/error";
import { useBentoHost } from "@/contexts/host";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { AppController } from "./controller";

export function AppContent({
  app,
  controller,
}: {
  app?: any;
  controller: AppController;
}) {
  const state = useSnapshot(controller.state);
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (state.error || (!app && !state.loading)) {
    return (
      <ErrorView
        message={"Error Loading Application"}
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
