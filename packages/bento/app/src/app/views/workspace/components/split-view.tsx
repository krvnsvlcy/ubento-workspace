import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

export type PanelDef = {
  size: number;
  onSizeChange?: (size: number) => void;
  content?: React.ReactNode;
  minSize?: number;
  maxSize?: number;
};

export function SplitView({
  left,
  right,
  position: controlledPosition,
  initialPosition = 50,
  minPosition = 20,
  maxPosition = 80,
  onChange,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  position?: number;
  initialPosition?: number;
  minPosition?: number;
  maxPosition?: number;
  onChange?: (position: number) => void;
}) {
  const [position, setPosition] = useState(controlledPosition ?? initialPosition);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledPosition !== undefined) {
      setPosition(controlledPosition);
    }
  }, [controlledPosition]);

  useEffect(() => {
    if (!isResizing) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPos = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(minPosition, Math.min(maxPosition, newPos));
      setPosition(clamped);
      onChange?.(clamped);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing, minPosition, maxPosition, onChange]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-hidden flex relative h-full w-full"
    >
      <div
        style={{
          width: `${position}%`,
          pointerEvents: isResizing ? "none" : "auto",
        }}
        className="h-full shrink-0"
      >
        {left}
      </div>
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
          document.body.style.cursor = "ew-resize";
        }}
        className={`absolute top-0 bottom-0 w-1.5 -ml-0.75 cursor-ew-resize z-50 transition-colors group ${
          isResizing ? "bg-accent" : "hover:bg-accent/30"
        } ${(position <= 0 || position >= 100) ? "hidden" : ""}`}
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-neutral-border group-hover:bg-accent/50 transition-colors" />
      </div>
      <div
        style={{
          width: `${100 - position}%`,
          pointerEvents: isResizing ? "none" : "auto",
        }}
        className="h-full min-w-0"
      >
        {right}
      </div>
    </div>
  );
}

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
  const [isDragging, setIsDragging] = useState(false);

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
      {left && (
        <Panel
          side="left"
          {...left}
          onDraggingChange={setIsDragging}
          isDraggingAny={isDragging}
        />
      )}

      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        {children}
      </div>

      {right && (
        <Panel
          side="right"
          {...right}
          onDraggingChange={setIsDragging}
          isDraggingAny={isDragging}
        />
      )}
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
  onDraggingChange,
  isDraggingAny,
}: PanelDef & {
  side: "left" | "right";
  onDraggingChange?: (dragging: boolean) => void;
  isDraggingAny?: boolean;
}) {
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
      onDraggingChange?.(false);
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
    pointerEvents: isDraggingAny ? ("none" as any) : "auto",
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
    pointerEvents: "auto",
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ width: size, height: "100%" }}>{content}</div>
      {size > 0 && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            onDraggingChange?.(true);
            document.body.style.cursor = "ew-resize";
          }}
          style={handleStyle}
        />
      )}
    </div>
  );
}
