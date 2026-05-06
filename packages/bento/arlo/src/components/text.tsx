import { type ComponentProps } from "@ubento/bento.runtime";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const textPropsSchema = layoutElementStyleSchema.extend({
  text: z.string().optional(),
  size: z.number().optional(),
  weight: z.number().optional(),
  color: z.string().optional(),
  align: z.enum(["left", "center", "right", "justify"]).optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  lineHeight: z.number().optional(),
});
export type TextProps = z.infer<typeof textPropsSchema>;

function getTextStyle(
  props: TextProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    fontSize: props.size ? `${props.size}px` : undefined,
    fontWeight: props.weight,
    textAlign: props.align,
    fontStyle: props.italic ? "italic" : undefined,
    textDecoration: props.underline ? "underline" : undefined,
    lineHeight: props.lineHeight,
  };
}

export function Text({ ref, props, children }: ComponentProps<TextProps>) {
  const layoutContext = useLayoutContext();
  return (
    <div ref={ref} style={getTextStyle(props, layoutContext)}>
      {props.text || children}
    </div>
  );
}
