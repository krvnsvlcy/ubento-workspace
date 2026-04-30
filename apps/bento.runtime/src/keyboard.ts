import type { BentoEngine } from "@ubento/engine";
import { useEffect } from "react";

export function useKeyboardController({ engine }: { engine: BentoEngine }) {
  useEffect(() => {
    let lastShiftPress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress < 300) {
          engine.toggleMode();
          lastShiftPress = 0;
        } else {
          lastShiftPress = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [engine]);
}
