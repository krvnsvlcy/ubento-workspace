import React, { useEffect, useState } from "react";
import { baseLengthUnit, spacingBaseUnit } from "../../constants";
import { useBentoEngine } from "../../engine";
import { ElementData } from "../../models";

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | "radius";

export function CornerHandle({
  position,
  onMouseDown,
}: {
  position: "ne" | "nw" | "se" | "sw";
  onMouseDown: (e: React.MouseEvent, dir: ResizeDirection) => void;
}) {
  const styles: Record<string, React.CSSProperties> = {
    nw: { top: -6, left: -6, cursor: "nw-resize" },
    ne: { top: -6, right: -6, cursor: "ne-resize" },
    sw: { bottom: -6, left: -6, cursor: "sw-resize" },
    se: { bottom: -6, right: -6, cursor: "se-resize" },
  };

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, position)}
      style={{
        position: "absolute",
        width: 12,
        height: 12,
        zIndex: 100,
        ...styles[position],
      }}
    />
  );
}

export function EdgeHandle({
  position,
  onMouseDown,
}: {
  position: "n" | "s" | "e" | "w";
  onMouseDown: (e: React.MouseEvent, dir: ResizeDirection) => void;
}) {
  const styles: Record<string, React.CSSProperties> = {
    n: { top: -4, left: "10%", right: "10%", height: 8, cursor: "n-resize" },
    s: { bottom: -4, left: "10%", right: "10%", height: 8, cursor: "s-resize" },
    e: { right: -4, top: "10%", bottom: "10%", width: 8, cursor: "e-resize" },
    w: { left: -4, top: "10%", bottom: "10%", width: 8, cursor: "w-resize" },
  };

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, position)}
      style={{
        position: "absolute",
        zIndex: 90,
        ...styles[position],
      }}
    />
  );
}

export function RadiusHandle({
  onMouseDown,
  radius,
  width,
  height,
}: {
  onMouseDown: (e: React.MouseEvent, dir: ResizeDirection) => void;
  radius: number;
  width: number;
  height: number;
}) {
  const widthPx = width * baseLengthUnit;
  const heightPx = height * baseLengthUnit;
  const radiusPx = radius * spacingBaseUnit;
  const limitPx = Math.min(widthPx / 2, heightPx / 2);
  const pos = Math.min(limitPx, Math.max(12, radiusPx));

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, "radius")}
      style={{
        position: "absolute",
        top: pos,
        right: pos,
        width: 10,
        height: 10,
        backgroundColor: "white",
        border: "2px solid #3b82f6",
        borderRadius: "50%",
        transform: "translate(50%, -50%)",
        zIndex: 110,
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    />
  );
}

export function BoxHandle({
  id,
  element,
}: {
  id: string;
  element: ElementData;
}) {
  const engine = useBentoEngine();
  const { setElementStyle, select } = engine;
  const isSelected = engine.useState((e) => e.selection?.includes(id));
  const isEditMode = engine.useState((e) => e.mode === "edit");

  const [dragType, setDragType] = useState<ResizeDirection | null>(null);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    initialStyle: any;
  } | null>(null);

  useEffect(() => {
    if (!dragType || !dragStart) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!dragStart) return;

      const totalDeltaX = e.clientX - dragStart.x;
      const totalDeltaY = e.clientY - dragStart.y;

      const unitDeltaX = Math.round(totalDeltaX / baseLengthUnit);
      const unitDeltaY = Math.round(totalDeltaY / baseLengthUnit);

      if (!element.style) return;

      const styleUpdates: any = {};

      if (dragType === "radius") {
        const initialRadius = dragStart.initialStyle.cornerRadius ?? 0;
        // For radius, we use a combination of horizontal and vertical movement
        const pixelChange = (totalDeltaY - totalDeltaX) / 2;
        const unitChange = Math.round(pixelChange / spacingBaseUnit);
        styleUpdates.cornerRadius = Math.max(0, initialRadius + unitChange);
      } else {
        const initialWidth = dragStart.initialStyle.width ?? 0;
        const initialHeight = dragStart.initialStyle.height ?? 0;

        if (dragType.includes("e")) {
          styleUpdates.width = Math.max(1, initialWidth + unitDeltaX);
        }
        if (dragType.includes("w")) {
          styleUpdates.width = Math.max(1, initialWidth - unitDeltaX);
        }
        if (dragType.includes("s")) {
          styleUpdates.height = Math.max(1, initialHeight + unitDeltaY);
        }
        if (dragType.includes("n")) {
          styleUpdates.height = Math.max(1, initialHeight - unitDeltaY);
        }
      }

      if (Object.keys(styleUpdates).length > 0) {
        // Only update if the unit-based values have actually changed
        const currentStyle = element.style as any;
        const hasChanged = Object.entries(styleUpdates).some(
          ([key, value]) => currentStyle[key] !== value,
        );
        if (hasChanged) {
          setElementStyle(id, styleUpdates);
        }
      }
    };

    const onMouseUp = () => {
      setDragType(null);
      setDragStart(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragType, dragStart, element, id]);

  if (!isEditMode) return null;

  const handleMouseDown = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();
    setDragType(dir);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialStyle: { ...element.style },
    });
  };

  const width = element.style?.width ?? 0;
  const height = element.style?.height ?? 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        select([id], e.shiftKey);
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        cursor: isSelected ? "default" : "pointer",
        boxShadow: isSelected ? "0 0 0 2px #3b82f6" : "none",
        pointerEvents: "auto",
      }}
    >
      {isSelected && (
        <>
          <CornerHandle position="nw" onMouseDown={handleMouseDown} />
          <CornerHandle position="ne" onMouseDown={handleMouseDown} />
          <CornerHandle position="sw" onMouseDown={handleMouseDown} />
          <CornerHandle position="se" onMouseDown={handleMouseDown} />
          <EdgeHandle position="n" onMouseDown={handleMouseDown} />
          <EdgeHandle position="s" onMouseDown={handleMouseDown} />
          <EdgeHandle position="e" onMouseDown={handleMouseDown} />
          <EdgeHandle position="w" onMouseDown={handleMouseDown} />
        </>
      )}
    </div>
  );
}
