import { DEFAULT_TEMPLATE } from "@/constants";
import { useBentoHost } from "@/contexts/host";
import { useAppBySlug } from "@/hooks/app";
import { Bridge } from "@ubento/engine";
import { ArrowLeft, Edit3, Monitor, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function App({ slug }: { slug: string }) {
  const host = useBentoHost();
  const { data: openedApp, isLoading, error } = useAppBySlug({ slug });

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Show overlay on first render for discovery
    setIsOverlayVisible(true);
    const timer = setTimeout(() => {
      setIsOverlayVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      {/* Background Gradient (Subtle) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-violet-500/5" />
      </div>

      <iframe
        ref={iframeRef}
        src={host.iframeUrl || "http://localhost:4020"}
        className="relative z-10 absolute inset-0 h-full w-full border-none"
        title="Ubento Runtime"
      />

      {/* Premium Header Overlay */}
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseLeave={() => setIsOverlayVisible(false)}
            className="absolute left-0 right-0 top-0 z-[100] p-4"
          >
            <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-background-300/80 px-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={closeApp}
                  className="group flex items-center gap-2 text-sm font-medium text-foreground-300 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Exit</span>
                </button>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 font-bold text-white shadow-lg shadow-primary-500/20">
                    {openedApp?.name?.[0].toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {openedApp?.name}
                    </span>
                    <span className="text-[10px] text-foreground-400">
                      {openedApp?.slug}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full border border-white/5 bg-background-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Toolbar (Host Side) */}
      <AnimatePresence>
        {mode === "edit" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-background-300/80 p-2 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => {
                  setMode("view");
                  sendCommand("SET_MODE", "view");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  mode === "view"
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                    : "text-foreground-300 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>View</span>
              </button>
              <button
                onClick={() => {
                  setMode("edit");
                  sendCommand("SET_MODE", "edit");
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  mode === "edit"
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                    : "text-foreground-300 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>

              <div className="h-4 w-px bg-white/10" />

              <button
                onClick={handleAiAction}
                className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:bg-violet-500"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Builder</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Hover Trigger Zone */}
      {!isOverlayVisible && (
        <div
          onMouseEnter={() => setIsOverlayVisible(true)}
          className="absolute left-0 right-0 top-0 z-[110] h-4"
        />
      )}
    </div>
  );
}
