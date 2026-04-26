import { useBentoHost } from "@/contexts/host";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { WorkspaceState } from "../controller.js";

export function WorkspaceNavigation({
  workspace,
  state,
}: {
  workspace?: any;
  state: WorkspaceState;
}) {
  const host = useBentoHost();
  const snap = useSnapshot(state);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef<any>(null);

  useEffect(() => {
    hideTimer.current = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(hideTimer.current);
  }, []);

  return (
    <>
      {!isVisible && (
        <div
          onMouseEnter={() => setIsVisible(true)}
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "100%",
            transform: "translateX(-50%)",
            zIndex: 100,
            height: "16px",
          }}
          className="max-w-5xl"
        />
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 200,
              padding: 16,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() => {
              clearTimeout(hideTimer.current);
            }}
            onMouseLeave={() => {
              clearTimeout(hideTimer.current);
              hideTimer.current = setTimeout(() => setIsVisible(false), 1000);
            }}
          >
            <div className="bg-background mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-background-300/80 px-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    host.goToLocation({ view: "home", params: {} })
                  }
                  className="group flex items-center gap-2 text-sm font-medium text-foreground-300 transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Exit</span>
                </button>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 font-bold text-white shadow-lg shadow-primary-500/20">
                    {workspace?.name?.[0].toUpperCase() || "W"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {workspace?.name}
                    </span>
                    <span className="text-[10px] text-foreground-400">
                      {workspace?.slug}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/20 px-2 py-0.5">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        snap.connected ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      }`}
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-foreground-500">
                      {snap.connected ? "Connected" : "Connecting"}
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
    </>
  );
}
