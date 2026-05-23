import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { LineChart as CoreLineChart } from "@ubento/bento.arlo-core";
import * as React from "react";

export const LineChart = createComponent({
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
    curveType: z.enum(["linear", "monotone", "step"]).default("monotone"),
  }),

  events: z.object({
    valueChange: z.any().optional(),
  }),

  summary: "A line chart component.",
  instructions: [
    "Use this component to visualize trends over time.",
    "The `data` prop is an array of objects.",
    "The `index` prop is the key for the X-axis.",
    "The `categories` prop is an array of keys for the lines.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreLineChart
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
        curveType={props.curveType}
        onValueChange={(value) => emit("valueChange", value)}
      />
    );
  },
});
