import { Calendar as CoreCalendar } from "@ubento/bento.arlo-core";
import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";

export const Calendar = createComponent({
  props: z.object({
    mode: z.enum(["single", "range"]).default("single"),
    numberOfMonths: z.number().default(1),
    enableYearNavigation: z.boolean().default(false),
    disabled: z.any().optional(), // Matcher
  }),

  bindings: z.object({
    value: z.any(), // Date or { from: Date, to: Date }
  }),

  summary: "A calendar component for date selection.",
  instructions: [
    "Use this component to allow users to select a date or a date range.",
    "The `mode` prop controls whether a single date or a range is selected.",
    "The `value` binding controls the selection.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const [value, setValue] = useBinding<any>("value");

    return (
      <CoreCalendar
        mode={props.mode as any}
        selected={value}
        onSelect={setValue}
        numberOfMonths={props.numberOfMonths}
        enableYearNavigation={props.enableYearNavigation}
        disabled={props.disabled}
      />
    );
  },
});
