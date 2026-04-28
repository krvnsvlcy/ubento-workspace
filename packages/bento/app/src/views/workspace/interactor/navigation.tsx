import { useBentoHost } from "@/contexts/host";
import { ArrowLeft, Pin, PinOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { WorkspaceController } from "../controller.js";

export function WorkspaceNavigation({
  controller,
  isPinned,
  onTogglePinned,
}: {
  controller: WorkspaceController;
  isPinned: boolean;
  onTogglePinned: () => void;
}) {
  const host = useBentoHost();
  const snap = useStore(controller);
  const [isVisible, setIsVisible] = useState(isPinned);
  const hideTimer = useRef<any>(null);

  useEffect(() => {
    if (isPinned) {
      setIsVisible(true);
      return;
    }
    hideTimer.current = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(hideTimer.current);
  }, [isPinned]);

  const navContent = (
    <div
      className={`mx-auto flex h-14 w-full items-center justify-between px-4 transition-all rounded-2xl bg-background-100/70 ${
        isPinned ? "" : "max-w-5xl shadow-2xl backdrop-blur-xl"
      }`}
      style={{
        background: "var(--page-background)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => host.goToLocation({ view: "home", params: {} })}
          className="group flex items-center gap-2 text-sm font-medium text-foreground-300 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Exit</span>
        </button>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 font-bold text-white shadow-lg shadow-primary-500/20">
            {snap.workspace?.name?.[0].toUpperCase() || "W"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">
              {snap.workspace?.name}
            </span>
            <span className="text-[10px] text-foreground-400">
              {snap.workspace?.slug}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/20 px-2 py-0.5">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                snap.connected ? "bg-blue-300" : "bg-yellow-300"
              }`}
            />
            <span className="text-[9px] font-bold uppercase tracking-wider text-foreground-500">
              {snap.connected ? "Connected" : "Connecting"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/20 px-2 py-0.5">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                snap.ready ? "bg-green-300" : "bg-yellow-300"
              }`}
            />
            <span className="text-[9px] font-bold uppercase tracking-wider text-foreground-500">
              {snap.ready ? "Ready" : "Loading"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePinned}
          title={isPinned ? "Unpin Navigation" : "Pin Navigation"}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors hover:bg-white/10 ${
            isPinned ? "text-primary-400" : "text-foreground-400"
          }`}
        >
          {isPinned ? (
            <PinOff className="h-4 w-4" />
          ) : (
            <Pin className="h-4 w-4" />
          )}
        </button>
        <div className="h-8 w-8 rounded-full border border-white/5 bg-background-500" />
      </div>
    </div>
  );

  return (
    <>
      {/* Pinned height placeholder and content */}
      <motion.div
        initial={false}
        animate={{
          height: isPinned ? 68 : 0,
          opacity: isPinned ? 1 : 0,
          padding: isPinned ? 6 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="relative z-[200] w-full overflow-hidden"
      >
        {navContent}
      </motion.div>

      {/* Floating hover trigger and overlay */}
      {!isPinned && (
        <>
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
                  hideTimer.current = setTimeout(
                    () => setIsVisible(false),
                    1000,
                  );
                }}
              >
                {navContent}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
