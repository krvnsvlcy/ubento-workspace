import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  LayoutContextType,
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
} from "../lib/style";

export const buttonPropsSchema = layoutElementStyleSchema.extend({
  label: z.string().optional(),
  variant: z
    .enum(["primary", "secondary", "outline", "ghost"])
    .default("primary"),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  disabled: z.boolean().optional(),
});
export type ButtonProps = z.infer<typeof buttonPropsSchema>;

function getButtonStyle(
  props: ButtonProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  const { variant, intent, size, disabled } = props;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    padding:
      size === "small"
        ? "4px 12px"
        : size === "large"
          ? "12px 24px"
          : "8px 16px",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
    fontWeight: 500,
    transition: "all 0.15s ease-in-out",
    border: "1px solid transparent",
    outline: "none",
    userSelect: "none",
    gap: "8px",
  };

  const themePrefix = `--color-${intent}`;

  if (variant === "primary") {
    return {
      ...baseStyles,
      background: `var(${themePrefix})`,
      color: `var(${themePrefix}-contrast)`,
      "--btn-hover-bg": `var(${themePrefix}-hover)`,
      "--btn-active-bg": `var(${themePrefix}-active)`,
    } as React.CSSProperties;
  }

  if (variant === "secondary") {
    return {
      ...baseStyles,
      background: `var(${themePrefix}-surface)`,
      color: `var(${themePrefix}-content)`,
      "--btn-hover-bg": `var(${themePrefix}-surface-hover)`,
      "--btn-active-bg": `var(${themePrefix}-surface-active)`,
    } as React.CSSProperties;
  }

  if (variant === "outline") {
    return {
      ...baseStyles,
      background: "transparent",
      border: `1px solid var(${themePrefix}-border)`,
      color: `var(${themePrefix}-content)`,
      "--btn-hover-bg": `var(${themePrefix}-surface)`,
      "--btn-active-bg": `var(${themePrefix}-surface-hover)`,
    } as React.CSSProperties;
  }

  if (variant === "ghost") {
    return {
      ...baseStyles,
      background: "transparent",
      color: `var(${themePrefix}-content)`,
      "--btn-hover-bg": `var(${themePrefix}-surface)`,
      "--btn-active-bg": `var(${themePrefix}-surface-hover)`,
    } as React.CSSProperties;
  }

  return baseStyles;
}

export function Button({ ref, props, children }: ComponentProps<ButtonProps>) {
  const layoutContext = useLayoutContext();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const style = getButtonStyle(props, layoutContext);

  const dynamicStyle = {
    ...style,
    background: isActive
      ? (style as any)["--btn-active-bg"] || style.background
      : isHovered
        ? (style as any)["--btn-hover-bg"] || style.background
        : style.background,
  };

  return (
    <button
      ref={ref}
      style={dynamicStyle}
      disabled={props.disabled}
      onMouseEnter={() => !props.disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => !props.disabled && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {props.label || children}
    </button>
  );
}
