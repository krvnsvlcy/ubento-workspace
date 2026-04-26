import React, { PropsWithChildren, useEffect, useState } from "react";

export function SideSplitView({
  side,
  children,
}: PropsWithChildren<{
  side: {
    edge: "left" | "right";
    size: number;
    onSizeChange?: (size: number) => void;
    content?: React.ReactNode;
    minSize?: number;
    maxSize?: number;
  };
}>) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      let newSize = side.size;
      if (side.edge === "right") {
        newSize = window.innerWidth - e.clientX;
      } else {
        newSize = e.clientX;
      }

      const clampedSize = Math.max(
        side.minSize ?? 240,
        Math.min(side.maxSize ?? 600, newSize),
      );
      side.onSizeChange?.(clampedSize);
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
  }, [
    isDragging,
    side.minSize,
    side.maxSize,
    side.edge,
    side.onSizeChange,
    side.size,
  ]);

  const sidebarStyle: React.CSSProperties = {
    flex: `0 0 ${side.size}px`,
    position: "relative",
    pointerEvents: isDragging ? "none" : "auto",
    overflow: "hidden",
    transition: isDragging
      ? "none"
      : "flex-basis 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    position: "relative",
    pointerEvents: isDragging ? "none" : "auto",
    overflow: "hidden",
  };

  const handleStyle: React.CSSProperties = {
    position: "absolute",
    [side.edge === "right" ? "left" : "right"]: 0,
    top: 0,
    bottom: 0,
    width: 4,
    cursor: "ew-resize",
    zIndex: 100,
    backgroundColor: isDragging ? "#3b82f6" : "transparent",
    transition: "background-color 0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        flexDirection: "row",
      }}
    >
      {side.edge === "left" && (
        <div style={sidebarStyle}>
          <div style={{ width: side.size, height: "100%" }}>{side.content}</div>
          {side.size > 0 && (
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
      )}

      <div style={mainStyle}>{children}</div>

      {side.edge === "right" && (
        <div style={sidebarStyle}>
          {side.size > 0 && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDragging(true);
                document.body.style.cursor = "ew-resize";
              }}
              style={handleStyle}
            />
          )}
          <div style={{ width: side.size, height: "100%" }}>{side.content}</div>
        </div>
      )}
    </div>
  );
}
