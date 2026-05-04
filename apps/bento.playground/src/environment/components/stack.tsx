import { edgesSpec, type ComponentProps } from "@ubento/engine";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  LayoutContext,
  type LayoutContextType,
} from "../style";

export const stackPropsSchema = layoutElementStyleSchema.extend({
  direction: z.enum(["row", "column"]),
  padding: edgesSpec(z.number()).optional(),
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
});
export type StackProps = z.infer<typeof stackPropsSchema>;

function getStackStyle(
  props: StackProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    position: "relative",
    gap: props.gap ? `${props.gap}px` : undefined,
    display: "flex",
    flexWrap: props.wrap ? "wrap" : "nowrap",
    flexDirection: props.direction,
    alignContent: props.align,
    justifyContent: props.justify,
    overflow: props.overflow,
  };
}

export function Stack({ props, children }: ComponentProps<StackProps>) {
  const parentLayoutContext = useLayoutContext();
  return (
    <LayoutContext.Provider value={props.direction}>
      <div style={getStackStyle(props, parentLayoutContext)}>{children}</div>
    </LayoutContext.Provider>
  );
}
