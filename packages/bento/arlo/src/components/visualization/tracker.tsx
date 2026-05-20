import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Tracker as CoreTracker } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Tracker = createComponent({
  props: z.object({
    data: z.array(
      z.object({
        key: z.union([z.string(), z.number()]).optional(),
        color: z.string().optional(),
        tooltip: z.string().optional(),
      })
    ),
    defaultBackgroundColor: z.string().optional(),
    hoverEffect: z.boolean().default(true),
  }),

  summary: "A status tracker component.",
  instructions: [
    "Use this component to display a sequence of events or status changes over time.",
    "The `data` prop is an array of objects representing each block in the tracker.",
    "Each block can have a `color` and a `tooltip`.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <CoreTracker
        ref={ref}
        data={props.data}
        defaultBackgroundColor={props.defaultBackgroundColor}
        hoverEffect={props.hoverEffect}
      />
    );
  },
});
