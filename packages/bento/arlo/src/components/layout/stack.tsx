import { createComponent, edgesSpec } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getEdgesStyle,
  getResizableElementStyle,
  LayoutContext,
  resizableElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../../lib/style/style.js";

export const stackPropsSchema = resizableElementStyleSchema.extend({
  direction: z.enum(["row", "column"]),
  padding: z.union([edgesSpec(z.number()), z.number()]).optional(),
  gap: z.number().optional(),
  justify: z
    .enum([
      "start",
      "end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ])
    .optional(),
  align: z.enum(["start", "end", "center", "stretch"]).optional(),
  wrap: z.boolean().optional(),
  overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
  tone: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .optional(),
  border: z.boolean().optional(),
  radius: z.number().optional(),
});
export type StackProps = z.infer<typeof stackPropsSchema>;

function getStackStyle(
  props: StackProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const {
    direction,
    padding,
    gap,
    justify,
    align,
    wrap,
    overflow,
    tone,
    border,
    radius,
  } = props;
  const themePrefix = tone ? `--color-${tone}` : null;

  return {
    ...getResizableElementStyle(props, layoutContext),
    position: "relative",
    gap: gap ? `${gap}px` : undefined,
    display: "flex",
    flexWrap: wrap ? "wrap" : "nowrap",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    overflow: overflow,
    ...getEdgesStyle(
      typeof padding === "number"
        ? {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
          }
        : padding,
      "padding",
    ),
    background: themePrefix ? `var(${themePrefix}-surface)` : undefined,
    border:
      border && themePrefix
        ? `1px solid var(${themePrefix}-border)`
        : undefined,
    borderRadius: radius ? `${radius}px` : undefined,
  };
}

export const Stack = createComponent({
  props: stackPropsSchema,
  summary: "Stack component",
  render: ({ ref, props, children }) => {
    const parentLayoutContext = useLayoutContext();
    return (
      <div ref={ref} style={getStackStyle(props, parentLayoutContext)}>
        <LayoutContext.Provider value={props.direction}>
          {children}
        </LayoutContext.Provider>
      </div>
    );
  },
});
