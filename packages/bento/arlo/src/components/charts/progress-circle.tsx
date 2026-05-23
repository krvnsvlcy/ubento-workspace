import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ProgressCircle as CoreProgressCircle } from "@ubento/bento.arlo-core";
import * as React from "react";

export const ProgressCircle = createComponent({
  props: z.object({
    value: z.number().min(0).optional(),
    max: z.number().default(100),
    radius: z.number().default(32),
    strokeWidth: z.number().default(6),
    showAnimation: z.boolean().default(true),
    variant: z
      .enum(["default", "neutral", "warning", "error", "success"])
      .default("default"),
  }),

  summary: "A circular progress indicator.",
  instructions: [
    "Use this component to display progress in a circular format.",
    "The `value` prop controls the progress amount.",
    "The `max` prop defines the 100% mark.",
    "Children are rendered in the center of the circle.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreProgressCircle
        ref={ref}
        value={props.value}
        max={props.max}
        radius={props.radius}
        strokeWidth={props.strokeWidth}
        showAnimation={props.showAnimation}
        variant={props.variant}
      >
        {children}
      </CoreProgressCircle>
    );
  },
});
