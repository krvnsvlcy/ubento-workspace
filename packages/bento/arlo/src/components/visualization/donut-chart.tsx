import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { DonutChart as CoreDonutChart } from "@ubento/bento.arlo-core";
import * as React from "react";

export const DonutChart = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    value: z.string(),
    category: z.string(),
    colors: z.array(z.string()).optional(),
    valueFormatter: z.any().optional(),
    showLabel: z.boolean().default(false),
    showTooltip: z.boolean().default(true),
    variant: z.enum(["donut", "pie"]).default("donut"),
  }),

  events: z.object({
    valueChange: z.any(),
  }),

  summary: "A donut or pie chart component.",
  instructions: [
    "Use this component to display proportional data.",
    "The `value` prop is the key for the numeric values.",
    "The `category` prop is the key for the category names.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreDonutChart
        ref={ref}
        data={props.data}
        value={props.value}
        category={props.category}
        colors={props.colors as any}
        valueFormatter={props.valueFormatter}
        showLabel={props.showLabel}
        showTooltip={props.showTooltip}
        variant={props.variant}
        onValueChange={(value) => emit("valueChange", value)}
      />
    );
  },
});
