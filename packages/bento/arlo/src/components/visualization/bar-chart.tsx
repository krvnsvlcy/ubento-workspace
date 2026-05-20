import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { BarChart as CoreBarChart } from "@ubento/bento.arlo-core";
import * as React from "react";

export const BarChart = createComponent({
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
    layout: z.enum(["horizontal", "vertical"]).default("horizontal"),
    type: z.enum(["default", "stacked", "percent"]).default("default"),
  }),

  events: z.object({
    valueChange: z.any().optional(),
  }),

  summary: "A bar chart component.",
  instructions: [
    "Use this component to visualize data using bars.",
    "The `data` prop is an array of objects.",
    "The `index` prop is the key for the X-axis.",
    "The `categories` prop is an array of keys for the bars.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreBarChart
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
        layout={props.layout}
        type={props.type}
        onValueChange={(value) => emit("valueChange", value)}
      />
    );
  },
});
