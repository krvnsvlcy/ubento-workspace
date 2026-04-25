import { useBentoHost } from "@/contexts/host";
import { useRef } from "react";

export function AppContent({
  app,
  loading,
  error,
}: {
  app?: any;
  loading: boolean;
  error: any;
}) {
  const host = useBentoHost();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="animate-pulse text-sm font-medium text-foreground-400">
          Loading Application...
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background gap-4">
        <div className="text-sm font-medium text-red-500/80">
          Failed to load application
        </div>
        <button
          onClick={() => host.goToLocation({ view: "home", params: {} })}
          className="text-xs font-semibold text-foreground-400 hover:text-foreground transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={host.iframeUrl || "http://localhost:4020"}
      style={{
        height: "100%",
        width: "100%",
        border: "none",
        outline: "none",
      }}
      title="Ubento Runtime"
    />
  );
}
