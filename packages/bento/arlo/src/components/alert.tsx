import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const alertPropsSchema = layoutElementStyleSchema.extend({
  title: z.string().optional(),
  description: z.string().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("info"),
  variant: z.enum(["default", "outline", "surface"]).default("surface"),
});
export type AlertProps = z.infer<typeof alertPropsSchema>;

function getAlertStyle(
  props: AlertProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { intent, variant } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    position: "relative",
    width: "100%",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    border: "1px solid transparent",
  };

  if (variant === "surface") {
    return {
      ...baseStyles,
      background: `var(${themePrefix}-surface)`,
      color: `var(${themePrefix}-content)`,
      borderColor: `var(${themePrefix}-border)`,
    };
  }

  if (variant === "outline") {
    return {
      ...baseStyles,
      background: "transparent",
      color: `var(${themePrefix}-content)`,
      borderColor: `var(${themePrefix}-border-active)`,
    };
  }

  return {
    ...baseStyles,
    background: `var(${themePrefix})`,
    color: `var(${themePrefix}-contrast)`,
  };
}

export function Alert({ ref, props, children }: ComponentProps<AlertProps>) {
  const layoutContext = useLayoutContext();
  return (
    <div ref={ref} role="alert" style={getAlertStyle(props, layoutContext)}>
      {props.title && (
        <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: 1.2 }}>
          {props.title}
        </div>
      )}
      <div style={{ fontSize: "13px", opacity: 0.9, lineHeight: 1.4 }}>
        {props.description || children}
      </div>
    </div>
  );
}
