import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../style";
import { type ComponentProps } from "@ubento/engine";

export const headingPropsSchema = layoutElementStyleSchema.extend({
  text: z.string().optional(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  size: z.number().optional(),
  weight: z.number().optional(),
  color: z.string().optional(),
  align: z.enum(["left", "center", "right", "justify"]).optional(),
});
export type HeadingProps = z.infer<typeof headingPropsSchema>;

function getHeadingStyle(
  props: HeadingProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    fontSize: props.size ? `${props.size}px` : undefined,
    fontWeight: props.weight,
    color: props.color,
    textAlign: props.align,
    margin: 0,
  };
}

export function Heading({ props, children }: ComponentProps<HeadingProps>) {
  const layoutContext = useLayoutContext();
  const Tag = props.level as any;
  return (
    <Tag style={getHeadingStyle(props, layoutContext)}>
      {props.text || children}
    </Tag>
  );
}
