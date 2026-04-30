import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { baseLengthUnit, spacingBaseUnit } from "../../constants";
import { useBentoEngine } from "../../engine";
import { ElementData, Length } from "../../models";
import { ParentContext } from "../core/context";

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
  const widthPx = width;
  const heightPx = height;
  const radiusPx = radius * spacingBaseUnit;
  const limitPx = Math.min(widthPx / 2, heightPx / 2);
  const pos = Math.min(limitPx, Math.max(12, radiusPx));

  return (
    <>
      <style>{`
        @container (width < 60px) or (height < 60px) {
          .bento-radius-handle {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="bento-radius-handle"
        onMouseDown={(e) => onMouseDown(e, "radius")}
        style={{
          position: "absolute",
          top: pos,
          right: pos,
          width: 10,
          height: 10,
          backgroundColor: "white",
          border: "2px solid var(--color-accent)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
          zIndex: 110,
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
    </>
  );
}

export function SizeControl({
  id,
  width,
  height,
}: {
  id: string;
  width?: Length;
  height?: Length;
}) {
  const engine = useBentoEngine();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = (e: React.MouseEvent, dimension: "width" | "height") => {
    e.stopPropagation();

    if (e.shiftKey) {
      engine.setElementStyle(id, { [dimension]: undefined });
      return;
    }

    const currentUnit = dimension === "width" ? width?.unit : height?.unit;
    let targetUnit: "px" | "%" = "px";

    if (currentUnit === "px") {
      targetUnit = "%";
    } else {
      // If currently % or fr, toggle back to px
      targetUnit = "px";
    }

    engine.convertElementSizeUnit(id, dimension, targetUnit);
  };

  const handleFill = (e: React.MouseEvent, dimension: "width" | "height") => {
    e.stopPropagation();
    const current = dimension === "width" ? width : height;

    if (current?.unit === "fr") {
      const delta = e.shiftKey ? -1 : 1;
      const nextValue = Math.max(1, (current.value ?? 1) + delta);
      engine.setElementStyle(id, {
        [dimension]: { value: nextValue, unit: "fr" },
      });
    } else {
      engine.setElementStyle(id, {
        [dimension]: { value: 1, unit: "fr" },
      });
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: "-50%", y: "0px" });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const padding = 12;

    let tx = -50;
    let ty = 0;

    if (rect.left < padding) {
      tx = tx + (padding - rect.left);
    } else if (rect.right > window.innerWidth - padding) {
      tx = tx - (rect.right - (window.innerWidth - padding));
    }

    if (rect.bottom > window.innerHeight - padding) {
      // Move above the element if it's at the bottom
      ty = -(rect.height + 16);
    }

    setTranslate({ x: `${tx}%`, y: `${ty}px` });
  }, [isHovered, width, height]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: `translate(${translate.x}, ${translate.y})`,
        background: "var(--color-accent-content)",
        color: "var(--color-accent-contrast)",
        padding: "2px 8px",
        borderRadius: "6px",
        fontSize: "10px",
        fontWeight: "600",
        pointerEvents: "auto",
        whiteSpace: "nowrap",
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease",
        minWidth: isHovered ? "120px" : "auto",
        justifyContent: "center",
      }}
    >
      {isHovered && (
        <button
          onClick={(e) => handleFill(e, "width")}
          title="Fill width (1fr)"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "inherit",
            padding: "2px 4px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 8 4 4-4 4" />
            <path d="M2 12h20" />
            <path d="m6 8-4 4 4 4" />
          </svg>
        </button>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span
          onClick={(e) => handleToggle(e, "width")}
          style={{ cursor: "pointer", display: "flex", gap: "1px" }}
          title="Toggle unit, Shift+Click for fit"
        >
          {width ? (
            <>
              {width.value}
              <span style={{ opacity: 0.7 }}>{width.unit}</span>
            </>
          ) : (
            "fit"
          )}
        </span>
        <span style={{ opacity: 0.5 }}>×</span>
        <span
          onClick={(e) => handleToggle(e, "height")}
          style={{ cursor: "pointer", display: "flex", gap: "1px" }}
          title="Toggle unit, Shift+Click for fit"
        >
          {height ? (
            <>
              {height.value}
              <span style={{ opacity: 0.7 }}>{height.unit}</span>
            </>
          ) : (
            "fit"
          )}
        </span>
      </div>

      {isHovered && (
        <button
          onClick={(e) => handleFill(e, "height")}
          title="Fill height (1fr)"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "inherit",
            padding: "2px 4px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 18 4 4 4-4" />
            <path d="M12 2v20" />
            <path d="m8 6 4-4 4 4" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function BoxHandle({
  id,
  element,
  isEmpty,
  children,
}: PropsWithChildren<{
  id: string;
  element: ElementData;
  isEmpty?: boolean;
}>) {
  const engine = useBentoEngine();
  const { select, setElementStyle } = engine;
  const isSelected = engine.useState((s) => s.selection.includes(id));
  const isHovered = engine.useState((s) => s.hover === id);
  const selectionScope = engine.useState((s) => s.selectionScope);
  const parentId = useContext(ParentContext);

  const isWithinScope = parentId === selectionScope;

  const isAncestorOfScope = React.useMemo(() => {
    if (!selectionScope || selectionScope === id) return false;
    const scopeEl = engine.getHtmlElement(selectionScope);
    const myEl = engine.getHtmlElement(id);
    return myEl && scopeEl && myEl.contains(scopeEl);
  }, [selectionScope, id, engine]);

  const isInteractive = isWithinScope || isAncestorOfScope;

  const [dragType, setDragType] = useState<ResizeDirection | null>(null);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    initialStyle: any;
    initialRect?: { width: number; height: number };
    parentRect?: { width: number; height: number };
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
        const initialWidth = dragStart.initialStyle.width as Length | undefined;
        const initialHeight = dragStart.initialStyle.height as
          | Length
          | undefined;

        const currentPixelWidth = dragStart.initialRect?.width ?? 0;
        const currentPixelHeight = dragStart.initialRect?.height ?? 0;

        let targetPixelWidth = currentPixelWidth;
        if (dragType.includes("e")) targetPixelWidth += totalDeltaX;
        if (dragType.includes("w")) targetPixelWidth -= totalDeltaX;
        targetPixelWidth = Math.max(
          baseLengthUnit,
          Math.round(targetPixelWidth / baseLengthUnit) * baseLengthUnit,
        );

        let targetPixelHeight = currentPixelHeight;
        if (dragType.includes("s")) targetPixelHeight += totalDeltaY;
        if (dragType.includes("n")) targetPixelHeight -= totalDeltaY;
        targetPixelHeight = Math.max(
          baseLengthUnit,
          Math.round(targetPixelHeight / baseLengthUnit) * baseLengthUnit,
        );

        if (dragType.includes("e") || dragType.includes("w")) {
          if (initialWidth?.unit === "%" && dragStart.parentRect?.width) {
            styleUpdates.width = {
              value: Math.round(
                (targetPixelWidth / dragStart.parentRect.width) * 100,
              ),
              unit: "%",
            };
          } else {
            styleUpdates.width = {
              value: targetPixelWidth,
              unit: "px",
            };
          }
        }

        if (dragType.includes("s") || dragType.includes("n")) {
          if (initialHeight?.unit === "%" && dragStart.parentRect?.height) {
            styleUpdates.height = {
              value: Math.round(
                (targetPixelHeight / dragStart.parentRect.height) * 100,
              ),
              unit: "%",
            };
          } else {
            styleUpdates.height = {
              value: targetPixelHeight,
              unit: "px",
            };
          }
        }
      }

      if (Object.keys(styleUpdates).length > 0) {
        // Only update if the unit-based values have actually changed
        const currentStyle = element.style as any;
        const hasChanged = Object.entries(styleUpdates).some(([key, value]) => {
          const currentValue = currentStyle[key];
          if (typeof value === "object" && value !== null) {
            return (
              currentValue?.value !== (value as any).value ||
              currentValue?.unit !== (value as any).unit
            );
          }
          return currentValue !== value;
        });
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

  const handleMouseDown = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();

    const el = engine.getHtmlElement(id);
    const rect = el?.getBoundingClientRect();
    const parentRect = el?.parentElement?.getBoundingClientRect();

    setDragType(dir);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialStyle: { ...element.style },
      initialRect: rect
        ? { width: rect.width, height: rect.height }
        : undefined,
      parentRect: parentRect
        ? { width: parentRect.width, height: parentRect.height }
        : undefined,
    });
  };

  const width = element.style?.width;
  const height = element.style?.height;

  return (
    <div
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();

        if (isAncestorOfScope) {
          engine.setSelectionScope(id);
          return;
        }

        select([id], e.shiftKey);
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        containerType: "size",
        cursor: isInteractive
          ? isSelected
            ? "default"
            : "pointer"
          : "default",
        border: isWithinScope
          ? isSelected
            ? "2px solid var(--color-accent-content)"
            : isHovered
              ? isEmpty
                ? "2px dashed var(--color-accent-content)"
                : "2px solid var(--color-accent-content)"
              : isEmpty
                ? "1px dashed var(--color-neutral-content-muted)"
                : "none"
          : isEmpty
            ? isAncestorOfScope
              ? "1px solid var(--color-accent-content-muted)"
              : "1px dashed color-mix(in srgb, var(--color-neutral-content-muted) 50%, transparent)"
            : "",
        pointerEvents: isInteractive ? "auto" : "none",
        borderRadius: "6px",
      }}
      onMouseEnter={() => {
        if (!isInteractive) return;
        engine.hover(id);
      }}
      onMouseLeave={() => {
        if (!isInteractive) return;
        engine.unHover(id);
      }}
    >
      {isWithinScope && isSelected && (
        <>
          <CornerHandle position="nw" onMouseDown={handleMouseDown} />
          <CornerHandle position="ne" onMouseDown={handleMouseDown} />
          <CornerHandle position="sw" onMouseDown={handleMouseDown} />
          <CornerHandle position="se" onMouseDown={handleMouseDown} />
          <EdgeHandle position="n" onMouseDown={handleMouseDown} />
          <EdgeHandle position="s" onMouseDown={handleMouseDown} />
          <EdgeHandle position="e" onMouseDown={handleMouseDown} />
          <EdgeHandle position="w" onMouseDown={handleMouseDown} />
          <SizeControl id={id} width={width} height={height} />
        </>
      )}
      {isWithinScope && (
        <div
          style={{
            height: "100%",
            width: "100%",
            opacity: isHovered || isSelected ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
