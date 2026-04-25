import { type AppEngineController } from "@ubento/engine";
import { useEffect } from "react";
import { rpc } from "./rpc";

export function useKeyboardController(controller?: AppEngineController) {
  useEffect(() => {
    if (!controller) return;

    let lastShiftPress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftPress < 300) {
          controller.toggleMode();
          lastShiftPress = 0;
        } else {
          lastShiftPress = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      rpc.dispose();
    };
  }, [controller]);
}
