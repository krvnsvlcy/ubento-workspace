import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const inputPropsSchema = layoutElementStyleSchema.extend({
  value: z.string().optional(),
  placeholder: z.string().optional(),
  type: z
    .enum(["text", "password", "email", "number", "tel", "url"])
    .default("text"),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
});
export type InputProps = z.infer<typeof inputPropsSchema>;

function getInputStyle(
  props: InputProps,
  layoutContext: LayoutContextType,
  isFocused: boolean,
  isHovered: boolean,
): React.CSSProperties {
  const { intent, size, disabled } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    padding:
      size === "small"
        ? "4px 10px"
        : size === "large"
          ? "10px 16px"
          : "8px 12px",
    borderRadius: "6px",
    fontSize: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
    lineHeight: "1.5",
    width: "100%",
    outline: "none",
    transition: "all 0.15s ease-in-out",
    border: `1px solid var(${themePrefix}-border)`,
    background: `var(--color-background)`,
    color: `var(--color-neutral-content)`,
    cursor: disabled ? "not-allowed" : "text",
    opacity: disabled ? 0.6 : 1,
  };

  if (isFocused) {
    baseStyles.borderColor = `var(${themePrefix})`;
    baseStyles.boxShadow = `0 0 0 2px var(${themePrefix}-surface)`;
  } else if (isHovered && !disabled) {
    baseStyles.borderColor = `var(${themePrefix}-border-hover)`;
  }

  return baseStyles;
}

export const Input = createComponent({
  props: inputPropsSchema,
  summary: "Input component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <input
        ref={ref}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={getInputStyle(props, layoutContext, isFocused, isHovered)}
      />
    );
  },
});
