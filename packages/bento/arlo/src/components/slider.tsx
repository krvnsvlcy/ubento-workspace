import { type ComponentProps } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const sliderPropsSchema = layoutElementStyleSchema.extend({
  value: z.number().default(0),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
  disabled: z.boolean().optional(),
});
export type SliderProps = z.infer<typeof sliderPropsSchema>;

export function Slider({ ref, props }: ComponentProps<SliderProps>) {
  const layoutContext = useLayoutContext();
  const { intent, value, min, max, disabled } = props;
  const themePrefix = `--color-${intent}`;

  const containerStyle: React.CSSProperties = {
    ...getLayoutElementStyle(props, layoutContext),
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "20px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div ref={ref} style={containerStyle}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "6px",
        background: `var(${themePrefix}-surface-active)`,
        borderRadius: "9999px",
      }} />
      <div style={{
        position: "absolute",
        width: `${percentage}%`,
        height: "6px",
        background: `var(${themePrefix})`,
        borderRadius: "9999px",
      }} />
      <input
        type="range"
        min={min}
        max={max}
        step={props.step}
        value={value}
        disabled={disabled}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "inherit",
          zIndex: 2,
        }}
        readOnly
      />
      <div style={{
        position: "absolute",
        left: `calc(${percentage}% - 10px)`,
        width: "20px",
        height: "20px",
        borderRadius: "9999px",
        background: "var(--color-background)",
        border: `2px solid var(${themePrefix})`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        pointerEvents: "none",
        zIndex: 1,
      }} />
    </div>
  );
}
