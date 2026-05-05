import { useEffect, useRef } from "react";
import { WorkspaceEngine } from "./engine/engine.js";

export function useKeyboardShortcuts({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const snap = controller.useState();
  const lastShiftPress = useRef<number>(0);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress.current < 300) {
          controller.setState((s) => ({
            ...s,
            mode: s.mode === "edit" ? "live" : "edit",
          }));
          lastShiftPress.current = 0;
        } else {
          lastShiftPress.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snap.mode, controller]);
}
