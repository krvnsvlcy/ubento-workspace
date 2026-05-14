import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
} from "../lib/style";

export const progressPropsSchema = layoutElementStyleSchema.extend({
  value: z.number().min(0).max(100).optional(),
  max: z.number().default(100),
  intent: z
    .enum(["accent", "neutral", "success", "warning", "info", "destructive"])
    .default("accent"),
});
export type ProgressProps = z.infer<typeof progressPropsSchema>;

export const Progress = createComponent({
  props: progressPropsSchema,
  summary: "Progress component",
  render: ({ ref, props }) => {
    const layoutContext = useLayoutContext();
    const { intent, value, max } = props;
    const themePrefix = `--color-${intent}`;

    const containerStyle: React.CSSProperties = {
      ...getLayoutElementStyle(props, layoutContext),
      position: "relative",
      width: "100%",
      height: "16px",
      overflow: "hidden",
      borderRadius: "9999px",
      background: `var(${themePrefix}-surface)`,
    };

    const percentage =
      value !== undefined
        ? Math.min(100, Math.max(0, (value / max) * 100))
        : null;

    const indicatorStyle: React.CSSProperties = {
      height: "100%",
      width: "100%",
      flex: 1,
      background: `var(${themePrefix})`,
      transition: "transform 0.2s ease-in-out",
      transform:
        percentage !== null
          ? `translateX(-${100 - percentage}%)`
          : "translateX(-100%)",
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        style={containerStyle}
      >
        <div style={indicatorStyle} />
      </div>
    );
  },
});
