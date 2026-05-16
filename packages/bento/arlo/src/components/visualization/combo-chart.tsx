import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { ComboChart as CoreComboChart } from "../../core/visualization/combo-chart.js";
import * as React from "react";

export const ComboChart = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    index: z.string(),
    barSeries: z.object({
      categories: z.array(z.string()),
      colors: z.array(z.string()).optional(),
      valueFormatter: z.any().optional(),
      showYAxis: z.boolean().optional(),
      type: z.enum(["default", "stacked"]).optional(),
    }),
    lineSeries: z
      .object({
        categories: z.array(z.string()),
        colors: z.array(z.string()).optional(),
        valueFormatter: z.any().optional(),
        showYAxis: z.boolean().optional(),
        connectNulls: z.boolean().optional(),
      })
      .optional(),
    showXAxis: z.boolean().default(true),
    showLegend: z.boolean().default(true),
    showGridLines: z.boolean().default(true),
    enableBiaxial: z.boolean().default(false),
  }),

  events: z.object({
    valueChange: z.any().optional(),
  }),

  summary: "A combination chart component (Bar + Line).",
  instructions: [
    "Use this component to visualize two different data series together.",
    "The `barSeries` and `lineSeries` props configure each part of the chart.",
    "The `enableBiaxial` prop allows for two different Y-axes.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreComboChart
        ref={ref}
        data={props.data}
        index={props.index}
        barSeries={props.barSeries as any}
        lineSeries={props.lineSeries as any}
        showXAxis={props.showXAxis}
        showLegend={props.showLegend}
        showGridLines={props.showGridLines}
        enableBiaxial={props.enableBiaxial}
        onValueChange={(value) => emit("valueChange", value)}
      />
    );
  },
});
