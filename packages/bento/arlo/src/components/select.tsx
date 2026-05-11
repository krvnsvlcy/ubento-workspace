import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
});

export const selectPropsSchema = layoutElementStyleSchema.extend({
  value: z.string().optional(),
  options: z.array(selectOptionSchema).default([]),
  placeholder: z.string().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  disabled: z.boolean().optional(),
});
export type SelectProps = z.infer<typeof selectPropsSchema>;

function getSelectStyle(
  props: SelectProps,
  layoutContext: LayoutContextType,
  isFocused: boolean,
  isHovered: boolean
): React.CSSProperties {
  const { intent, size, disabled } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    padding:
      size === "small"
        ? "4px 30px 4px 10px"
        : size === "large"
          ? "10px 40px 10px 16px"
          : "8px 35px 8px 12px",
    borderRadius: "6px",
    fontSize: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
    lineHeight: "1.5",
    width: "100%",
    outline: "none",
    transition: "all 0.15s ease-in-out",
    border: `1px solid var(${themePrefix}-border)`,
    background: `var(--color-background)`,
    color: `var(--color-neutral-content)`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='F19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${size === "small" ? "8px" : size === "large" ? "12px" : "10px"} center`,
    backgroundSize: size === "small" ? "12px" : "16px",
  };

  if (isFocused) {
    baseStyles.borderColor = `var(${themePrefix})`;
    baseStyles.boxShadow = `0 0 0 2px var(${themePrefix}-surface)`;
  } else if (isHovered && !disabled) {
    baseStyles.borderColor = `var(${themePrefix}-border-hover)`;
  }

  return baseStyles;
}

export function Select({ ref, props }: ComponentProps<SelectProps>) {
  const layoutContext = useLayoutContext();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <select
      ref={ref}
      value={props.value}
      disabled={props.disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getSelectStyle(props, layoutContext, isFocused, isHovered)}
    >
      {props.placeholder && (
        <option value="" disabled>
          {props.placeholder}
        </option>
      )}
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
