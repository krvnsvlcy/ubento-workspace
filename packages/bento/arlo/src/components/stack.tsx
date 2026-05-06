import { edgesSpec, type ComponentProps } from "@ubento/bento.engine";
import { z } from "zod";
import {
  getLayoutElementStyle,
  LayoutContext,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

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
    alignItems: props.align,
    justifyContent: props.justify,
    overflow: props.overflow,
  };
}

export function Stack({ ref, props, children }: ComponentProps<StackProps>) {
  const parentLayoutContext = useLayoutContext();
  return (
    <div ref={ref} style={getStackStyle(props, parentLayoutContext)}>
      <LayoutContext.Provider value={props.direction || "row"}>
        {children}
      </LayoutContext.Provider>
    </div>
  );
}
