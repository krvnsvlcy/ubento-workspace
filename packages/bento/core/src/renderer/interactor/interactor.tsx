import { useEffect, useState } from "react";
import {
  useDomManager,
  useEnvironment,
  useInteractionManager,
} from "../states/environment";

function ElementHandle({ id, rootRect }: { id: string; rootRect: DOMRect }) {
  const domManager = useDomManager();
  const interactionManager = useInteractionManager();

  const element = domManager.useState((state) => state.elements[id]);
  const absoluteRect = domManager.useState(
    (state) => state.rects[id],
    (a, b) => {
      if (!a || !b) return a === b;
      return (
        a.x === b.x &&
        a.y === b.y &&
        a.width === b.width &&
        a.height === b.height
      );
    },
  );

  const isSelected = interactionManager.useState((state) =>
    state.selection.includes(id),
  );
  const isHovered = interactionManager.useState(
    (state) => state.hovered === id,
  );

  if (!absoluteRect) return null;

  const rect = {
    x: absoluteRect.x - rootRect.x,
    y: absoluteRect.y - rootRect.y,
    width: absoluteRect.width,
    height: absoluteRect.height,
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        interactionManager.select(id);
      }}
      onMouseEnter={() => interactionManager.hover(id)}
      onMouseLeave={() => interactionManager.hover(undefined)}
      style={{
        position: "absolute",
        top: `${rect.y}px`,
        left: `${rect.x}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        outline: isSelected
          ? "2px solid var(--color-accent)"
          : isHovered
            ? "1px solid var(--color-accent)"
            : "none",
        backgroundColor: isSelected
          ? "rgba(99, 102, 241, 0.05)"
          : isHovered
            ? "rgba(99, 102, 241, 0.03)"
            : "transparent",
        pointerEvents: "auto",
        cursor: "pointer",
        zIndex: element.parents.length, // we want the most nested elements to be on top
        transition: "outline 0.1s ease-out, background-color 0.1s ease-out",
      }}
    >
      {(isSelected || isHovered) && (
        <div
          style={{
            position: "absolute",
            top: rect.y < 20 ? 0 : -18,
            left: -1,
            backgroundColor: "var(--color-accent)",
            color: "white",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "2px 6px",
            borderRadius: "2px 2px 0 0",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {id}
        </div>
      )}
    </div>
  );
}

export function Interactor() {
  const environment = useEnvironment();
  const interactionManager = useInteractionManager();

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
      id="bento-interactor"
      onClick={() => interactionManager.clearSelection()}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 9999,
        boxShadow:
          "inset 0 0 8px color-mix(in srgb, var(--color-accent), transparent 50%)",
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
