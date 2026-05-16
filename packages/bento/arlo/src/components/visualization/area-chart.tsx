import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { AreaChart as CoreAreaChart } from "../../core/visualization/area-chart.js";
import * as React from "react";

export const AreaChart = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    index: z.string(),
    categories: z.array(z.string()),
    colors: z.array(z.string()).optional(),
    valueFormatter: z.any().optional(),
    showXAxis: z.boolean().default(true),
    showYAxis: z.boolean().default(true),
    showLegend: z.boolean().default(true),
    showGridLines: z.boolean().default(true),
    type: z.enum(["default", "stacked", "percent"]).default("default"),
  }),

  events: z.object({
    valueChange: z.any().optional(),
  }),

  summary: "An area chart component.",
  instructions: [
    "Use this component to visualize quantities over time.",
    "The `data` prop is an array of objects.",
    "The `index` prop is the key for the X-axis.",
    "The `categories` prop is an array of keys for the areas.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreAreaChart
        ref={ref}
        data={props.data}
        index={props.index}
        categories={props.categories}
        colors={props.colors as any}
        valueFormatter={props.valueFormatter}
        showXAxis={props.showXAxis}
        showYAxis={props.showYAxis}
        showLegend={props.showLegend}
        showGridLines={props.showGridLines}
        type={props.type}
        onValueChange={(value) => emit("valueChange", value)}
      />
    );
  },
});
