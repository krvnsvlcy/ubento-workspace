import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const textPropsSchema = layoutElementStyleSchema.extend({
  text: z.string().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  subtle: z.boolean().optional(),
  size: z.number().optional(),
  weight: z.number().optional(),
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
  const { intent, subtle, size, weight, align, italic, underline, lineHeight } =
    props;
  const themePrefix = `--color-${intent}`;
  const colorSuffix = subtle ? "-content-subtle" : "-content";

  return {
    ...getLayoutElementStyle(props, layoutContext),
    fontSize: size ? `${size}px` : undefined,
    fontWeight: weight,
    textAlign: align,
    fontStyle: italic ? "italic" : undefined,
    textDecoration: underline ? "underline" : undefined,
    lineHeight: lineHeight ? `${lineHeight}` : "1.5",
    color: `var(${themePrefix}${colorSuffix})`,
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
