import { Surface as CoreSurface } from "@ubento/bento.arlo-core";
import { createComponent, edgesSpec } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getEdgesStyle,
  getResizableElementStyle,
  resizableElementStyleSchema,
  useLayoutContext,
} from "../../lib/style/style.js";

export const surfacePropsSchema = resizableElementStyleSchema.extend({
  padding: z.union([edgesSpec(z.number()), z.number()]).optional(),
  fill: z.enum(["flat", "subtle", "tinted", "bold"]).default("flat"),
  tone: z
    .enum([
      "neutral",
      "accent",
      "inverse",
      "info",
      "success",
      "warning",
      "destructive",
    ])
    .default("neutral"),
  interactive: z.boolean().default(false),
  border: z.boolean().default(false),
  radius: z.number().optional(),
});

export type SurfaceProps = z.infer<typeof surfacePropsSchema>;

export const Surface = createComponent({
  props: surfacePropsSchema,

  summary: "A container for displaying content on a solid background.",
  instructions: [
    "Use this component to display content on a solid background.",
    "It supports padding, border, radius, and tone variants.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    const parentLayoutContext = useLayoutContext();
    const { padding, tone, fill, interactive, border, radius } = props;
    const themePrefix = `--color-${tone}`;

    const style: React.CSSProperties = {
      ...getResizableElementStyle(props, parentLayoutContext),
      position: "relative",
      border: border ? `1px solid var(${themePrefix}-border)` : undefined,
      borderRadius: radius ? `${radius}px` : undefined,
      ...getEdgesStyle(
        typeof padding === "number"
          ? {
              top: padding,
              bottom: padding,
              left: padding,
              right: padding,
            }
          : padding,
        "padding",
      ),
    };

    return (
      <CoreSurface
        ref={ref}
        style={style}
        tone={tone}
        fill={fill}
        interactive={interactive}
      >
        {children}
      </CoreSurface>
    );
  },
});
