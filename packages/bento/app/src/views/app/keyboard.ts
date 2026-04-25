import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { AppState } from "./controller";

export function useKeyboardShortcuts({ state }: { state: AppState }) {
  const snap = useSnapshot(state);
  const lastShiftPress = useRef<number>(0);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress.current < 300) {
          state.mode = snap.mode === "edit" ? "live" : "edit";
          lastShiftPress.current = 0;
        } else {
          lastShiftPress.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snap.mode]);
}
