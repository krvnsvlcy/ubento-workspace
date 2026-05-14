import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const textareaPropsSchema = layoutElementStyleSchema.extend({
  value: z.string().optional(),
  placeholder: z.string().optional(),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("neutral"),
  disabled: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  rows: z.number().default(3),
  resize: z
    .enum(["none", "vertical", "horizontal", "both"])
    .default("vertical"),
});
export type TextareaProps = z.infer<typeof textareaPropsSchema>;

function getTextareaStyle(
  props: TextareaProps,
  layoutContext: LayoutContextType,
  isFocused: boolean,
  isHovered: boolean,
): React.CSSProperties {
  const { intent, disabled, resize } = props;
  const themePrefix = `--color-${intent}`;

  const baseStyles: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    lineHeight: "1.5",
    width: "100%",
    outline: "none",
    transition: "all 0.15s ease-in-out",
    border: `1px solid var(${themePrefix}-border)`,
    background: `var(--color-background)`,
    color: `var(--color-neutral-content)`,
    cursor: disabled ? "not-allowed" : "text",
    opacity: disabled ? 0.6 : 1,
    resize: resize,
    minHeight: "80px",
  };

  if (isFocused) {
    baseStyles.borderColor = `var(${themePrefix})`;
    baseStyles.boxShadow = `0 0 0 2px var(${themePrefix}-surface)`;
  } else if (isHovered && !disabled) {
    baseStyles.borderColor = `var(${themePrefix}-border-hover)`;
  }

  return baseStyles;
}

export const Textarea = createComponent({
  props: textareaPropsSchema,
  summary: "Textarea component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <textarea
        ref={ref}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        rows={props.rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={getTextareaStyle(props, layoutContext, isFocused, isHovered)}
      />
    );
  },
});
