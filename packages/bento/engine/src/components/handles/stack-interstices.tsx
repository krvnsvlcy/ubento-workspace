import { useLayoutEffect, useState } from "react";
import { useBentoEngine } from "../../engine/engine";

export function StackInterstices({
  id,
  direction,
}: {
  id: string;
  direction: "row" | "column";
}) {
  const engine = useBentoEngine();
  const [interstices, setInterstices] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  useLayoutEffect(() => {
    const el = engine.getHtmlElement(id);
    if (!el) return;

    const children = Array.from(el.children).filter((child) =>
      child.hasAttribute("data-element-id"),
    );

    const calculate = () => {
      const parentRect = el.getBoundingClientRect();
      const currentChildren = Array.from(el.children).filter((child) =>
        child.hasAttribute("data-element-id"),
      );

      if (currentChildren.length < 2) {
        setInterstices([]);
        return;
      }

      const rects = currentChildren.map((child) =>
        child.getBoundingClientRect(),
      );
      const newInterstices = [];

      for (let i = 0; i < rects.length - 1; i++) {
        const curr = rects[i];
        const next = rects[i + 1];

        if (direction === "row") {
          const x = curr.right - parentRect.left;
          const width = next.left - curr.right;
          newInterstices.push({
            x,
            y: 0,
            width: Math.max(8, width),
            height: parentRect.height,
          });
        } else {
          const y = curr.bottom - parentRect.top;
          const height = next.top - curr.bottom;
          newInterstices.push({
            x: 0,
            y,
            width: parentRect.width,
            height: Math.max(8, height),
          });
        }
      }
      setInterstices(newInterstices);
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(el);
    children.forEach((child) => observer.observe(child as Element));

    return () => observer.disconnect();
  }, [id, direction, engine]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {interstices.map((rect, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            pointerEvents: "auto",
            transform:
              direction === "row" ? "translateX(-50%)" : "translateY(-50%)",
          }}
        />
      ))}
    </div>
  );
}
