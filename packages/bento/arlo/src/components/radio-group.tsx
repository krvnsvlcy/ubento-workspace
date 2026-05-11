import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const radioOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disabled: z.boolean().optional(),
});

export const radioGroupPropsSchema = layoutElementStyleSchema.extend({
  value: z.string().optional(),
  options: z.array(radioOptionSchema).default([]),
  direction: z.enum(["row", "column"]).default("column"),
  gap: z.number().default(12),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
});
export type RadioGroupProps = z.infer<typeof radioGroupPropsSchema>;

export function RadioGroup({ ref, props }: ComponentProps<RadioGroupProps>) {
  const layoutContext = useLayoutContext();
  const { options, value, direction, gap, intent } = props;
  const themePrefix = `--color-${intent}`;

  const containerStyle: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    display: "flex",
    flexDirection: direction,
    gap: `${gap}px`,
  };

  return (
    <div ref={ref} style={containerStyle}>
      {options.map((option) => {
        const isChecked = value === option.value;
        return (
          <label key={option.value} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: option.disabled ? "not-allowed" : "pointer",
            fontSize: "14px",
            opacity: option.disabled ? 0.6 : 1,
            color: "var(--color-neutral-content)",
          }}>
            <div style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: `2px solid ${isChecked ? `var(${themePrefix})` : "var(--color-neutral-border-active)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}>
              {isChecked && (
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: `var(${themePrefix})`,
                }} />
              )}
            </div>
            <input
              type="radio"
              name="radio-group"
              value={option.value}
              checked={isChecked}
              disabled={option.disabled}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              readOnly
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
