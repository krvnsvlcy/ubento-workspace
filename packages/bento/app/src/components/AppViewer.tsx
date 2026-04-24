import { Bridge } from "@ubento/engine";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_TEMPLATE } from "../constants";
import { Host } from "../types";

interface AppViewerProps {
  openedApp: any;
  closeApp: () => void;
  host: Host;
  templateOverrides?: any;
}

export function AppViewer({
  openedApp,
  closeApp,
  host,
  templateOverrides,
}: AppViewerProps) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const cleanup = Bridge.listen((type: string, payload?: any) => {
      if (type === "APP_READY" && openedApp) {
        if (iframeRef.current?.contentWindow) {
          Bridge.send(iframeRef.current.contentWindow, "INITIALIZE_GUEST", {
            app: openedApp.config || {
              id: openedApp.id,
              routes: { "/": "home" },
            },
            pages: templateOverrides || DEFAULT_TEMPLATE,
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
  }, [openedApp, templateOverrides]);

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
      "What would you like to build? (Try 'add text')"
    );
    if (prompt) {
      sendCommand("AI_ACTION", prompt);
    }
  };

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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-3 bg-background-300/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
            <button
              onClick={() => {
                setMode("view");
                sendCommand("SET_MODE", "view");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mode === "view"
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-foreground-300 hover:text-foreground hover:bg-white/5"
              }`}
            >
              View
            </button>
            <button
              onClick={() => {
                setMode("edit");
                sendCommand("SET_MODE", "edit");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mode === "edit"
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-foreground-300 hover:text-foreground hover:bg-white/5"
              }`}
            >
              Edit
            </button>

            <div className="w-px h-4 bg-white/10" />

            <button
              onClick={handleAiAction}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2"
            >
              <span>✨</span> AI Builder
            </button>
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isOverlayVisible && mode === "edit" ? "opacity-100" : "opacity-0"}`}
      >
        <div className="pointer-events-auto flex h-12 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={closeApp}
              className="h-8 px-2 rounded hover:bg-black/10 flex items-center justify-center text-sm font-bold transition-colors"
            >
              &larr; Back
            </button>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="text-sm font-bold text-gray-800">
              {openedApp?.name}{" "}
              <span className="font-normal text-gray-400 ml-2">
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
          className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 z-50 flex items-center justify-center text-xl"
        >
          {isOverlayVisible ? "✕" : "⌘"}
        </button>
      )}
    </div>
  );
}
