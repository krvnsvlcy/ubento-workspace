import { edgesSpec, createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getEdgesStyle,
  getLayoutElementStyle,
  LayoutContext,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const gridPropsSchema = layoutElementStyleSchema.extend({
  columns: z.number().optional(),
  rows: z.number().optional(),
  gap: z.number().optional(),
  padding: z.union([edgesSpec(z.number()), z.number()]).optional(),
  align: z.enum(["start", "end", "center", "stretch"]).optional(),
  justify: z.enum(["start", "end", "center", "stretch"]).optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .optional(),
  border: z.boolean().optional(),
  radius: z.number().optional(),
});
export type GridProps = z.infer<typeof gridPropsSchema>;

function getGridStyle(
  props: GridProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { columns, rows, gap, padding, align, justify, intent, border, radius } =
    props;
  const themePrefix = intent ? `--color-${intent}` : null;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    display: "grid",
    gridTemplateColumns: columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : undefined,
    gridTemplateRows: rows ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
    gap: gap ? `${gap}px` : undefined,
    alignItems: align,
    justifyItems: justify,
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
      border && themePrefix ? `1px solid var(${themePrefix}-border)` : undefined,
    borderRadius: radius ? `${radius}px` : undefined,
  };
}

export const Grid = createComponent({
  schema: gridPropsSchema,
  summary: "Grid component",
  render: ({ ref, props, children }) => {
    const layoutContext = useLayoutContext();
    return (
      <div ref={ref} style={getGridStyle(props, layoutContext)}>
        <LayoutContext.Provider value="grid">{children}</LayoutContext.Provider>
      </div>
    );
  }
});
