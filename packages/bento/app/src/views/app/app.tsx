import { Bridge } from "@ubento/engine";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_TEMPLATE } from "@/constants";
import { useBentoHost } from "@/contexts/host";
import { useAppBySlug } from "@/hooks/app";

export function App({ slug }: { slug: string }) {
  const host = useBentoHost();
  const {
    data: openedApp,
    isLoading,
    error,
  } = useAppBySlug({ slug });

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!openedApp) return;

    const cleanup = Bridge.listen((type: string, payload?: any) => {
      if (type === "APP_READY") {
        if (iframeRef.current?.contentWindow) {
          Bridge.send(iframeRef.current.contentWindow, "INITIALIZE_GUEST", {
            app: (openedApp as any).config || {
              id: openedApp.id,
              routes: { "/": "home" },
            },
            pages: (openedApp as any).metadata?.pages || DEFAULT_TEMPLATE,
          });
        }
      }

      if (type === "TOGGLE_MODE") {
        setMode((prev) => {
          const next = prev === "view" ? "edit" : "view";
          if (iframeRef.current?.contentWindow) {
            Bridge.send(iframeRef.current.contentWindow, "SET_MODE", next);
          }
          return next;
        });
      }
    });
    return cleanup;
  }, [openedApp]);

  useEffect(() => {
    let lastShiftTime = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const currentTime = Date.now();
        if (currentTime - lastShiftTime < 500) {
          setMode((prev) => {
            const next = prev === "view" ? "edit" : "view";
            if (iframeRef.current?.contentWindow) {
              Bridge.send(iframeRef.current.contentWindow, "SET_MODE", next);
            }
            return next;
          });
          lastShiftTime = 0;
        } else {
          lastShiftTime = currentTime;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sendCommand = (type: string, payload?: any) => {
    if (iframeRef.current?.contentWindow) {
      Bridge.send(iframeRef.current.contentWindow, type, payload);
    }
  };

  const handleAiAction = () => {
    const prompt = window.prompt(
      "What would you like to build? (Try 'add text')",
    );
    if (prompt) {
      sendCommand("AI_ACTION", prompt);
    }
  };

  const closeApp = () => {
    host.goToLocation({ view: "home", params: {} });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="animate-pulse text-sm font-medium text-foreground-400">
          Loading Application...
        </div>
      </div>
    );
  }

  if (error || !openedApp) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background gap-4">
        <div className="text-sm font-medium text-red-500/80">
          Failed to load application
        </div>
        <button
          onClick={closeApp}
          className="text-xs font-semibold text-foreground-400 hover:text-foreground transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <iframe
        ref={iframeRef}
        src={host.iframeUrl || "http://localhost:4020"}
        className="absolute inset-0 h-full w-full border-none"
        title="Ubento Runtime"
      />

      {/* Editor Toolbar (Host Side) */}
      {mode === "edit" && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-background-300/80 p-2 shadow-2xl backdrop-blur-xl">
            <button
              onClick={() => {
                setMode("view");
                sendCommand("SET_MODE", "view");
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                mode === "view"
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-foreground-300 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              View
            </button>
            <button
              onClick={() => {
                setMode("edit");
                sendCommand("SET_MODE", "edit");
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                mode === "edit"
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-foreground-300 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              Edit
            </button>

            <div className="h-4 w-px bg-white/10" />

            <button
              onClick={handleAiAction}
              className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:bg-violet-500"
            >
              <span>✨</span> AI Builder
            </button>
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${isOverlayVisible && mode === "edit" ? "opacity-100" : "opacity-0"}`}
      >
        <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={closeApp}
              className="flex h-8 items-center justify-center rounded px-2 text-sm font-bold transition-colors hover:bg-black/10"
            >
              &larr; Back
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              U
            </div>
            <span className="text-sm font-bold text-gray-800">
              {openedApp?.name}{" "}
              <span className="ml-2 font-normal text-gray-400">
                ({openedApp?.slug || openedApp?.id})
              </span>
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {mode === "edit" && (
        <button
          onClick={() => setIsOverlayVisible(!isOverlayVisible)}
          className="z-50 absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-xl transition-all hover:bg-blue-700 active:scale-95"
        >
          {isOverlayVisible ? "✕" : "⌘"}
        </button>
      )}
    </div>
  );
}
