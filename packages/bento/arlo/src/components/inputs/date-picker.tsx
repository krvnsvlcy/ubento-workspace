import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { SingleDatePicker, RangeDatePicker } from "@ubento/bento.arlo-core";
import * as React from "react";

export const DatePicker = createComponent({
  props: z.object({
    mode: z.enum(["single", "range"]).default("single"),
    placeholder: z.string().optional(),
    disabled: z.boolean().optional(),
    showTimePicker: z.boolean().default(false),
    enableYearNavigation: z.boolean().default(false),
  }),

  bindings: z.object({
    value: z.any(), // Date or { from: Date, to: Date }
  }),

  summary: "A date picker component with popover calendar.",
  instructions: [
    "Use this component to allow users to select a date or a date range from a popover.",
    "The `mode` prop controls whether a single date or a range is selected.",
    "The `value` binding controls the selection.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    if (props.mode === "range") {
      return (
        <RangeDatePicker
          ref={ref}
          value={value}
          onChange={setValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          showTimePicker={props.showTimePicker}
          enableYearNavigation={props.enableYearNavigation}
        />
      );
    }

    return (
      <SingleDatePicker
        ref={ref}
        value={value}
        onChange={setValue}
        placeholder={props.placeholder}
        disabled={props.disabled}
        showTimePicker={props.showTimePicker}
        enableYearNavigation={props.enableYearNavigation}
      />
    );
  },
});
