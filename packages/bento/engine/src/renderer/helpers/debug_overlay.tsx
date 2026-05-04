import { useEffect, useState } from "react";
import { useDomManager, useEnvironment } from "../states/environment";

function ElementHandle({ id, rootRect }: { id: string; rootRect: DOMRect }) {
  const domManager = useDomManager();
  const absoluteRect = domManager.useState(
    (state) => state.rects[id],
    (a, b) => {
      return (
        a.x === b.x &&
        a.y === b.y &&
        a.width === b.width &&
        a.height === b.height
      );
    },
  );

  const rect = {
    x: absoluteRect.x - rootRect.x,
    y: absoluteRect.y - rootRect.y,
    width: absoluteRect.width,
    height: absoluteRect.height,
  };

  return (
    <div
      id={id}
      style={{
        position: "absolute",
        top: `${rect.y}px`,
        left: `${rect.x}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        outline: "1px solid red",
      }}
    />
  );
}

/**
 * DebugOverlay renders a visual outline and label for all tracked elements
 * within the Bento Engine's DOM store. It's useful for verifying layout
 * bounds and element identification during development.
 */
export function DebugOverlay() {
  const environment = useEnvironment();
  const elementIds = environment.domManager.useState(
    (state) => Object.keys(state.elements),
    (a, b) => {
      return (
        a.length == b.length && a.every((value, index) => value === b[index])
      );
    },
  );
  const [rootDom, setRootDom] = useState<HTMLDivElement | null>(null);
  const [rootRect, setRootRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (rootDom) {
      setRootRect(rootDom.getBoundingClientRect());

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setRootRect(entry.target.getBoundingClientRect());
        }
      });
      observer.observe(rootDom);
      return () => observer.disconnect();
    }
  }, [rootDom]);

  return (
    <div
      ref={setRootDom}
      id="bento-debug-overlay"
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      {rootRect ? (
        elementIds.map((id) => (
          <ElementHandle key={id} id={id} rootRect={rootRect} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
