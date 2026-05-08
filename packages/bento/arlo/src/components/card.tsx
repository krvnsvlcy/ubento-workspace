import { edgesSpec, type ComponentProps } from "@ubento/bento.core";
import { z } from "zod";
import {
  getEdgesStyle,
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const cardPropsSchema = layoutElementStyleSchema.extend({
  padding: z.union([edgesSpec(z.number()), z.number()]).optional(),
  radius: z.number().optional(),
  background: z.string().optional(),
  border: z.string().optional(),
  shadow: z.union([z.boolean(), z.string()]).optional(),
});
export type CardProps = z.infer<typeof cardPropsSchema>;

function getCardStyle(
  props: CardProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    ...getEdgesStyle(
      typeof props.padding === "number"
        ? {
            top: props.padding,
            bottom: props.padding,
            left: props.padding,
            right: props.padding,
          }
        : props.padding,
      "padding",
    ),
    borderRadius: props.radius !== undefined ? `${props.radius}px` : "16px",
    background: props.background || "white",
    border: props.border || "1px solid #f1f5f9",
    boxShadow:
      props.shadow === true
        ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        : typeof props.shadow === "string"
          ? props.shadow
          : undefined,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };
}

export function Card({ ref, props, children }: ComponentProps<CardProps>) {
  const layoutContext = useLayoutContext();
  return (
    <div ref={ref} style={getCardStyle(props, layoutContext)}>
      {children}
    </div>
  );
}
