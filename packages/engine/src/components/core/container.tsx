import { Element } from "../element";
import { coreComponent } from "./types";

export interface ContainerProps {
  children: string[];
  layout?: "flex" | "grid" | "none";
  direction?: "row" | "column";
  gap?: {
    x?: number;
    y?: number;
  };
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  columns?: number[];
  rows?: number[];
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyContent?: "start" | "end" | "center" | "stretch";
  
  // Dimensional and styling props
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  background?: string;
  cornerRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
}

export const container = coreComponent(
  "container",
  ({
    children,
    layout = "flex",
    direction,
    gap,
    padding,
    columns,
    rows,
    alignItems,
    justifyContent,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    background,
    cornerRadius,
    borderWidth,
    borderColor,
    overflow,
  }: ContainerProps) => {
    return (
      <div
        style={{
          display: layout === "none" ? "block" : layout,
          flexDirection: direction,
          gap: gap ? `${gap.y ?? 0}px ${gap.x ?? 0}px` : undefined,
          padding: padding ? `${padding.top ?? 0}px ${padding.right ?? 0}px ${padding.bottom ?? 0}px ${padding.left ?? 0}px` : undefined,
          gridTemplateColumns: columns?.map((c) => `${c}%`).join(" "),
          gridTemplateRows: rows?.map((r) => `${r}%`).join(" "),
          alignItems,
          justifyContent,
          width,
          height,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          backgroundColor: background,
          borderRadius: cornerRadius ? `${cornerRadius}px` : undefined,
          borderWidth: borderWidth ? `${borderWidth}px` : undefined,
          borderStyle: borderWidth ? "solid" : undefined,
          borderColor,
          overflow,
        }}
      >
        {children.map((child, index) => (
          <Element key={index} id={child} />
        ))}
      </div>
    );
  },
);
