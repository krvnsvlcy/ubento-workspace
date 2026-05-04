import { lengthSchema, type LengthSpec } from "@ubento/engine";
import { createContext, useContext } from "react";
import z from "zod";

function lengthToCSS(length?: LengthSpec, flexAxis?: "main" | "cross") {
  if (!length) return undefined;
  if (length.unit === "fr") {
    if (flexAxis === "main") {
      return undefined;
    } else {
      return "100%";
    }
  }
  return `${length.value}${length.unit}`;
}

export const layoutElementStyleSchema = z.object({
  width: lengthSchema.optional(),
  height: lengthSchema.optional(),
  minWidth: z.number().default(64),
  maxWidth: z.number().optional(),
  minHeight: z.number().default(64),
  maxHeight: z.number().optional(),
});
export type LayoutElementStyle = z.infer<typeof layoutElementStyleSchema>;

export function getLayoutElementStyle(
  style: LayoutElementStyle,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  let mainAxisFlex: number | undefined;

  // Determine if we need to apply flex-grow based on our custom 'fr' unit
  if (layoutContext === "row" && style.width?.unit === "fr") {
    mainAxisFlex = style.width.value;
  }
  if (layoutContext === "column" && style.height?.unit === "fr") {
    mainAxisFlex = style.height.value;
  }

  // Calculate base dimensions
  const widthVal = lengthToCSS(
    style.width,
    layoutContext === "row" ? "main" : "cross",
  );
  const heightVal = lengthToCSS(
    style.height,
    layoutContext === "row" ? "cross" : "main",
  );

  return {
    position: "relative",
    // Only fallback to fit-content if it's NOT acting as a flex item on this axis
    width:
      widthVal !== undefined
        ? widthVal
        : layoutContext === "row" && mainAxisFlex
          ? undefined
          : "fit-content",
    height:
      heightVal !== undefined
        ? heightVal
        : layoutContext === "column" && mainAxisFlex
          ? undefined
          : "fit-content",

    // Prioritize the explicit fr unit, fallback to explicit flex property
    flex: mainAxisFlex !== undefined ? mainAxisFlex : undefined,

    minWidth: style.minWidth ? `${style.minWidth}px` : undefined,
    maxWidth: style.maxWidth ? `${style.maxWidth}px` : undefined,
    minHeight: style.minHeight ? `${style.minHeight}px` : undefined,
    maxHeight: style.maxHeight ? `${style.maxHeight}px` : undefined,
  };
}

export type LayoutContextType = "row" | "column" | "grid";
export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
);
export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutContext");
  }
  return context;
}
