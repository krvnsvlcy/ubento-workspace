import { LayoutContextType } from "@ubento/bento.arlo-core";
import { lengthSchema } from "@ubento/bento.core";
import z from "zod";
import { lengthToCSS } from "./utils";

export const resizableElementStyleSchema = z.object({
  width: lengthSchema.optional(),
  height: lengthSchema.optional(),
  minWidth: z.number().default(0),
  maxWidth: z.number().optional(),
  minHeight: z.number().default(0),
  maxHeight: z.number().optional(),
});
export type ResizableElementStyle = z.infer<typeof resizableElementStyleSchema>;

export function getResizableElementStyle(
  style: ResizableElementStyle,
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
          : undefined,
    height:
      heightVal !== undefined
        ? heightVal
        : layoutContext === "column" && mainAxisFlex
          ? undefined
          : undefined,

    // Prioritize the explicit fr unit, fallback to explicit flex property
    flex: mainAxisFlex !== undefined ? mainAxisFlex : undefined,

    minWidth: style.minWidth ? `${style.minWidth}px` : undefined,
    maxWidth: style.maxWidth ? `${style.maxWidth}px` : undefined,
    minHeight: style.minHeight ? `${style.minHeight}px` : undefined,
    maxHeight: style.maxHeight ? `${style.maxHeight}px` : undefined,
  };
}
