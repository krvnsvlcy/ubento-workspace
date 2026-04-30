import React, { PropsWithChildren, useEffect, useState } from "react";

export type PanelDef = {
  size: number;
  onSizeChange?: (size: number) => void;
  content?: React.ReactNode;
  minSize?: number;
  maxSize?: number;
};

export function SideSplitView({
  left,
  right,
  padding,
  gap,
  children,
}: PropsWithChildren<{
  left?: PanelDef;
  right?: PanelDef;
  padding?: number;
  gap?: number;
}>) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        flexDirection: "row",
        padding,
        gap,
      }}
    >
      {left && <Panel side="left" {...left} />}

      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {right && <Panel side="right" {...right} />}
    </div>
  );
}

function Panel({
  side,
  size,
  onSizeChange,
  content,
  minSize = 240,
  maxSize = 600,
}: PanelDef & { side: "left" | "right" }) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      let newSize = size;
      if (side === "right") {
        newSize = window.innerWidth - e.clientX;
      } else {
        newSize = e.clientX;
      }

      const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
      onSizeChange?.(clampedSize);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, minSize, maxSize, side, onSizeChange, size]);

  const sidebarStyle: React.CSSProperties = {
    flex: `0 0 ${size}px`,
    position: "relative",
    pointerEvents: isDragging ? "none" : "auto",
    overflow: "hidden",
    transition: isDragging
      ? "none"
      : "flex-basis 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const handleStyle: React.CSSProperties = {
    position: "absolute",
    [side === "right" ? "left" : "right"]: 0,
    top: 0,
    bottom: 0,
    width: 4,
    cursor: "ew-resize",
    zIndex: 100,
    backgroundColor: isDragging ? "#3b82f6" : "transparent",
    transition: "background-color 0.2s",
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ width: size, height: "100%" }}>{content}</div>
      {size > 0 && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            document.body.style.cursor = "ew-resize";
          }}
          style={handleStyle}
        />
      )}
    </div>
  );
}
