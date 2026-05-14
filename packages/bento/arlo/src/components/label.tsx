import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const labelPropsSchema = layoutElementStyleSchema.extend({
  text: z.string().optional(),
  htmlFor: z.string().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  size: z.number().optional(),
  weight: z.number().default(500),
  disabled: z.boolean().optional(),
});
export type LabelProps = z.infer<typeof labelPropsSchema>;

function getLabelStyle(
  props: LabelProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { intent, size, weight, disabled } = props;
  const themePrefix = `--color-${intent}`;

  return {
    ...getLayoutElementStyle(props, layoutContext),
    fontSize: size ? `${size}px` : "14px",
    fontWeight: weight,
    color: `var(${themePrefix}-content)`,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "inherit",
    opacity: disabled ? 0.6 : 1,
    display: "inline-block",
  };
}

export const Label = createComponent({
  props: labelPropsSchema,
  summary: "Label component",
  render: ({ ref, props, children }) => {
    const layoutContext = useLayoutContext();
    return (
      <label
        ref={ref}
        htmlFor={props.htmlFor}
        style={getLabelStyle(props, layoutContext)}
      >
        {props.text || children}
      </label>
    );
  },
});
