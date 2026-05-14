import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
} from "../lib/style";

export const switchPropsSchema = layoutElementStyleSchema.extend({
  checked: z.boolean().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
  disabled: z.boolean().optional(),
});
export type SwitchProps = z.infer<typeof switchPropsSchema>;

export const Switch = createComponent({
  props: switchPropsSchema,
  summary: "Switch component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const { intent, disabled, checked } = props;
    const themePrefix = `--color-${intent}`;

    const containerStyle: React.CSSProperties = {
      ...getLayoutElementStyle(props, layoutContext),
      width: "44px",
      height: "24px",
      borderRadius: "9999px",
      background: checked
        ? `var(${themePrefix})`
        : `var(--color-neutral-surface-active)`,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "all 0.15s ease-in-out",
      display: "inline-flex",
      alignItems: "center",
      padding: "2px",
      boxSizing: "border-box",
      border: "none",
      outline: "none",
    };

    if (isFocused) {
      containerStyle.boxShadow = `0 0 0 2px var(${themePrefix}-surface)`;
    }

    const thumbStyle: React.CSSProperties = {
      width: "20px",
      height: "20px",
      background: "var(--color-background)",
      borderRadius: "9999px",
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      transform: checked ? "translateX(20px)" : "translateX(0)",
      transition: "transform 0.15s ease-in-out",
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={containerStyle}
      >
        <div style={thumbStyle} />
      </button>
    );
  },
});
