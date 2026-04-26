import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useEngineController } from "../../controller";
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
  const limit = Math.min(width / 2, height / 2);
  const pos = Math.min(limit, Math.max(9, radius));

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
  const controller = useEngineController();
  const controllerStateSnap = useSnapshot(controller.state);
  const [dragType, setDragType] = useState<ResizeDirection | null>(null);

  const isSelected = controllerStateSnap.selection?.includes(id);
  const isEditMode = controllerStateSnap.mode === "edit";

  useEffect(() => {
    if (!dragType) return;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.movementX;
      const deltaY = e.movementY;

      if (!element.style) return;

      if (dragType === "radius") {
        const current = element.style.cornerRadius ?? 0;
        const change = deltaY - deltaX;
        element.style.cornerRadius = Math.max(0, current + change / 2);
        return;
      }

      if (dragType.includes("e")) {
        if (typeof element.style.width === "number")
          element.style.width += deltaX;
      }
      if (dragType.includes("w")) {
        if (typeof element.style.width === "number")
          element.style.width -= deltaX;
      }
      if (dragType.includes("s")) {
        if (typeof element.style.height === "number")
          element.style.height += deltaY;
      }
      if (dragType.includes("n")) {
        if (typeof element.style.height === "number")
          element.style.height -= deltaY;
      }
    };

    const onMouseUp = () => {
      setDragType(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragType, element]);

  if (!isEditMode) return null;

  const handleMouseDown = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();
    setDragType(dir);
  };

  const width = element.style?.width ?? 0;
  const height = element.style?.height ?? 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        controller.select([id], e.shiftKey);
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        cursor: isSelected ? "default" : "pointer",
        boxShadow: isSelected
          ? "0 0 0 2px #3b82f6"
          : "0 0 0 1px rgba(59, 130, 246, 0.3)",
        borderRadius: element.style?.cornerRadius
          ? `${element.style.cornerRadius}px`
          : undefined,
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

          <RadiusHandle
            onMouseDown={handleMouseDown}
            radius={element.style?.cornerRadius ?? 0}
            width={width}
            height={height}
          />

          {/* Label */}
          <div
            style={{
              position: "absolute",
              top: -24,
              left: -2,
              backgroundColor: "#3b82f6",
              color: "white",
              fontSize: "10px",
              padding: "2px 6px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {element.type}
          </div>
        </>
      )}
    </div>
  );
}
