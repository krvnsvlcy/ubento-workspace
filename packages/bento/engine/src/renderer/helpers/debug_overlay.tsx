import { useEffect, useState } from "react";
import { useEnvironment } from "../states/environment";

/**
 * DebugOverlay renders a visual outline and label for all tracked elements
 * within the Bento Engine's DOM store. It's useful for verifying layout
 * bounds and element identification during development.
 */
export function DebugOverlay() {
  const environment = useEnvironment();
  const [elements, setElements] = useState<Array<{ id: string; rect: DOMRect }>>(
    [],
  );

  useEffect(() => {
    const updateRects = () => {
      const allDoms = environment.domStore.getAll();
      const nextElements = Object.entries(allDoms)
        .map(([id, dom]) => {
          if (!dom || !dom.isConnected) return null;
          return {
            id,
            rect: dom.getBoundingClientRect(),
          };
        })
        .filter((el): el is { id: string; rect: DOMRect } => el !== null);

      setElements(nextElements);
    };

    // Use polling for smooth debug updates as layout transitions might not trigger events
    const interval = setInterval(updateRects, 16); // ~60fps
    updateRects();

    // Also listen to standard events for immediate updates
    window.addEventListener("scroll", updateRects, true);
    window.addEventListener("resize", updateRects);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", updateRects, true);
      window.removeEventListener("resize", updateRects);
    };
  }, [environment]);

  if (environment.debugging?.hideElementOutlines) return null;

  return (
    <div
      id="bento-debug-overlay"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      {elements.map(({ id, rect }) => (
        <div
          key={id}
          style={{
            position: "fixed",
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            outline: "1px solid rgba(99, 102, 241, 0.4)", // Indigo-500 with alpha
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            boxSizing: "border-box",
            transition: "all 0.1s ease-out",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: rect.top < 20 ? 0 : -14, // Prevent label from being cut off at top of screen
              left: 0,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
              color: "white",
              fontSize: "9px",
              fontWeight: "bold",
              padding: "1px 4px",
              borderRadius: "1px",
              whiteSpace: "nowrap",
              pointerEvents: "auto", // Allow selecting ID text if needed
            }}
          >
            {id}
          </div>
        </div>
      ))}
    </div>
  );
}
