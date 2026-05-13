import { type ComponentProps, createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const badgePropsSchema = layoutElementStyleSchema.extend({
  label: z.string().optional(),
  variant: z.enum(["solid", "surface", "outline"]).default("surface"),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  size: z.enum(["small", "medium"]).default("medium"),
});
export type BadgeProps = z.infer<typeof badgePropsSchema>;

function getBadgeStyle(
  props: BadgeProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { variant, intent, size } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    padding: size === "small" ? "2px 8px" : "4px 12px",
    fontSize: size === "small" ? "11px" : "12px",
    lineHeight: 1,
  };

  if (variant === "solid") {
    return {
      ...baseStyles,
      background: `var(${themePrefix})`,
      color: `var(${themePrefix}-contrast)`,
    };
  }

  if (variant === "surface") {
    return {
      ...baseStyles,
      background: `var(${themePrefix}-surface)`,
      color: `var(${themePrefix}-content)`,
      border: `1px solid var(${themePrefix}-border)`,
    };
  }

  if (variant === "outline") {
    return {
      ...baseStyles,
      background: "transparent",
      color: `var(${themePrefix}-content)`,
      border: `1px solid var(${themePrefix}-border)`,
    };
  }

  return baseStyles;
}

export const Badge = createComponent({
  schema: badgePropsSchema,
  summary: "Badge component",
  render: ({ ref, props, children }) => {
    const layoutContext = useLayoutContext();
    return (
      <span ref={ref} style={getBadgeStyle(props, layoutContext)}>
        {props.label || children}
      </span>
    );
  }
});
