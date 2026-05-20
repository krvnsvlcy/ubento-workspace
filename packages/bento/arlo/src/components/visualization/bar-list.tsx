import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { BarList as CoreBarList } from "@ubento/bento.arlo-core";
import * as React from "react";

export const BarList = createComponent({
  props: z.object({
    data: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
        key: z.string().optional(),
        href: z.string().optional(),
      })
    ),
    valueFormatter: z.any().optional(), // function
    showAnimation: z.boolean().default(false),
    sortOrder: z.enum(["ascending", "descending", "none"]).default("descending"),
  }),

  events: z.object({
    valueChange: z.object({
      name: z.string(),
      value: z.number(),
      key: z.string().optional(),
      href: z.string().optional(),
    }),
  }),

  summary: "A list of horizontal bars for comparing values.",
  instructions: [
    "Use this component to rank items by value.",
    "The `data` prop is an array of objects with `name` and `value`.",
    "The `valueChange` event is emitted when an item is clicked (if interactive).",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreBarList
        ref={ref}
        data={props.data}
        valueFormatter={props.valueFormatter}
        showAnimation={props.showAnimation}
        sortOrder={props.sortOrder}
        onValueChange={(payload) => emit("valueChange", payload)}
      />
    );
  },
});
