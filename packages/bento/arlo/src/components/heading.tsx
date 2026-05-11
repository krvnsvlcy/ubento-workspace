import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const headingPropsSchema = layoutElementStyleSchema.extend({
  text: z.string().optional(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  size: z.number().optional(),
  weight: z.number().optional(),
  align: z.enum(["left", "center", "right", "justify"]).optional(),
});
export type HeadingProps = z.infer<typeof headingPropsSchema>;

function getHeadingStyle(
  props: HeadingProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { size, weight, align, intent } = props;
  const themePrefix = `--color-${intent}`;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    fontSize: size ? `${size}px` : undefined,
    fontWeight: weight || 600,
    textAlign: align,
    color: `var(${themePrefix}-content)`,
    margin: 0,
    lineHeight: 1.2,
  };
}

export function Heading({
  ref,
  props,
  children,
}: ComponentProps<HeadingProps>) {
  const layoutContext = useLayoutContext();
  const Tag = props.level as any;
  return (
    <Tag ref={ref} style={getHeadingStyle(props, layoutContext)}>
      {props.text || children}
    </Tag>
  );
}
