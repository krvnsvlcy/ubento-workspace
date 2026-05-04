import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  LayoutContext,
  type LayoutContextType,
} from "../style";
import { edgesSpec, type ComponentProps } from "@ubento/engine";

export const gridPropsSchema = layoutElementStyleSchema.extend({
  columns: z.number().optional(),
  rows: z.number().optional(),
  gap: z.number().optional(),
  columnGap: z.number().optional(),
  rowGap: z.number().optional(),
  padding: edgesSpec(z.number()).optional(),
  align: z.enum(["start", "end", "center", "stretch"]).optional(),
  justify: z.enum(["start", "end", "center", "stretch"]).optional(),
});
export type GridProps = z.infer<typeof gridPropsSchema>;

function getGridStyle(
  props: GridProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    display: "grid",
    gridTemplateColumns: props.columns
      ? `repeat(${props.columns}, minmax(0, 1fr))`
      : undefined,
    gridTemplateRows: props.rows
      ? `repeat(${props.rows}, minmax(0, 1fr))`
      : undefined,
    gap: props.gap ? `${props.gap}px` : undefined,
    columnGap: props.columnGap ? `${props.columnGap}px` : undefined,
    rowGap: props.rowGap ? `${props.rowGap}px` : undefined,
    alignItems: props.align,
    justifyItems: props.justify,
  };
}

export function Grid({ props, children }: ComponentProps<GridProps>) {
  const layoutContext = useLayoutContext();
  return (
    <LayoutContext.Provider value="grid">
      <div style={getGridStyle(props, layoutContext)}>{children}</div>
    </LayoutContext.Provider>
  );
}
