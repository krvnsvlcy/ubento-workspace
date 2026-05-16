import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Tooltip as CoreTooltip } from "../../core/ui/tooltip.js";
import * as React from "react";

export const Tooltip = createComponent({
  props: z.object({
    content: z.string(),
    side: z.enum(["top", "right", "bottom", "left"]).default("top"),
    showArrow: z.boolean().default(true),
  }),

  summary: "A tooltip component to display information on hover.",
  instructions: [
    "Use this component to display a brief message when the user hovers over an element.",
    "The `content` prop sets the text to display.",
    "The `side` prop controls where the tooltip appears.",
    "Wrap the target element with this component.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreTooltip
        ref={ref}
        content={props.content}
        side={props.side}
        showArrow={props.showArrow}
        asChild
      >
        {children || <button className="hidden" />}
      </CoreTooltip>
    );
  },
});
