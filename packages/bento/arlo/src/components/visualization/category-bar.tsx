import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { CategoryBar as CoreCategoryBar } from "@ubento/bento.arlo-core";
import * as React from "react";

export const CategoryBar = createComponent({
  props: z.object({
    values: z.array(z.number()),
    colors: z.array(z.string()).optional(),
    marker: z
      .object({
        value: z.number(),
        tooltip: z.string().optional(),
        showAnimation: z.boolean().optional(),
      })
      .optional(),
    showLabels: z.boolean().default(true),
  }),

  summary: "A multi-segment progress bar with a marker.",
  instructions: [
    "Use this component to display a value within a multi-segmented range.",
    "The `values` prop defines the width of each segment.",
    "The `marker` prop defines a specific point to highlight on the bar.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <CoreCategoryBar
        ref={ref}
        values={props.values}
        colors={props.colors as any}
        marker={props.marker}
        showLabels={props.showLabels}
      />
    );
  },
});
