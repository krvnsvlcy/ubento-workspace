import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  SparkAreaChart,
  SparkBarChart,
  SparkLineChart,
} from "../../core/visualization/spack-chart.js";
import * as React from "react";

export const SparkChart = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    index: z.string(),
    categories: z.array(z.string()),
    colors: z.array(z.string()).optional(),
    type: z.enum(["area", "bar", "line"]).default("area"),
    variant: z.enum(["default", "stacked", "percent"]).default("default"),
  }),

  summary: "A small trend chart component.",
  instructions: [
    "Use this component to display a small, simplified chart.",
    "The `type` prop selects between area, bar, or line chart.",
    "The `data` prop is an array of objects.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const ChartComponent =
      props.type === "area"
        ? SparkAreaChart
        : props.type === "bar"
          ? SparkBarChart
          : SparkLineChart;

    return (
      <ChartComponent
        ref={ref}
        data={props.data}
        index={props.index}
        categories={props.categories}
        colors={props.colors as any}
        {...(props.type === "area" || props.type === "bar"
          ? { type: props.variant }
          : {})}
      />
    );
  },
});
