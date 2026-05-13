import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const checkboxPropsSchema = layoutElementStyleSchema.extend({
  checked: z.boolean().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
  disabled: z.boolean().optional(),
});
export type CheckboxProps = z.infer<typeof checkboxPropsSchema>;

function getCheckboxStyle(
  props: CheckboxProps,
  layoutContext: LayoutContextType,
  isFocused: boolean,
  isHovered: boolean
): React.CSSProperties {
  const { intent, disabled, checked } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    appearance: "none",
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    border: `1px solid ${checked ? `var(${themePrefix})` : `var(--color-neutral-border-active)`}`,
    background: checked ? `var(${themePrefix})` : "var(--color-background)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.15s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    outline: "none",
    position: "relative",
  };

  if (isFocused) {
    baseStyles.boxShadow = `0 0 0 2px var(${themePrefix}-surface)`;
  } else if (isHovered && !disabled && !checked) {
    baseStyles.borderColor = `var(--color-neutral-hover)`;
  }

  return baseStyles;
}

export const Checkbox = createComponent({
  schema: checkboxPropsSchema,
  summary: "Checkbox component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <input
        type="checkbox"
        ref={ref}
        checked={props.checked}
        disabled={props.disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={getCheckboxStyle(props, layoutContext, isFocused, isHovered)}
      />
    );
  }
});
