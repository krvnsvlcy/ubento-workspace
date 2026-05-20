import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Slider as CoreSlider } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Slider = createComponent({
  props: z.object({
    min: z.number().default(0),
    max: z.number().default(100),
    step: z.number().default(1),
    disabled: z.boolean().optional(),
  }),

  bindings: z.object({
    value: z.number(),
  }),

  summary: "A slider input field.",
  instructions: [
    "Use this component to capture a numeric value within a range.",
    "The `value` binding controls the value of the slider.",
    "The `min`, `max`, and `step` props control the range and increments.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    return (
      <CoreSlider
        ref={ref}
        value={[value]}
        onValueChange={(val) => setValue(val[0])}
        min={props.min}
        max={props.max}
        step={props.step}
        disabled={props.disabled}
      />
    );
  },
});
