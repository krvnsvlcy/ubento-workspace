import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Badge as CoreBadge } from "../../core/ui/badge.js";
import * as React from "react";

export const Badge = createComponent({
  props: z.object({
    label: z.string().optional(),
    variant: z
      .enum(["default", "neutral", "success", "error", "warning"])
      .default("neutral"),
  }),

  summary: "A small badge component for status or labels.",
  instructions: [
    "Use this component to display a small status or label.",
    "The `variant` prop controls the color of the badge.",
    "You can provide a `label` or pass children for the content.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreBadge
        ref={ref}
        variant={props.variant}
      >
        {props.label || children}
      </CoreBadge>
    );
  },
});
