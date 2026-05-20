import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  RadioGroup as CoreRadioGroup,
  RadioGroupItem,
} from "@ubento/bento.arlo-core";

export const RadioGroup = createComponent({
  props: z.object({
    options: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disabled: z.boolean().optional(),
        }),
      )
      .default([]),
    direction: z.enum(["row", "column"]).default("column"),
    gap: z.number().default(12),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A radio group component for selecting a single option.",
  instructions: [
    "Use this component to allow users to select one option from a list.",
    "Provide an `options` array with `label` and `value` for each option.",
    "The `direction` prop controls the layout (`row` or `column`).",
    "The `value` binding controls the selected option.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    const isRow = props.direction === "row";

    return (
      <CoreRadioGroup
        ref={ref}
        value={value}
        onValueChange={setValue}
        className={cx(isRow ? "flex flex-row" : "flex flex-col")}
        style={{ gap: `${props.gap}px` }}
      >
        {props.options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={option.value}
              disabled={option.disabled}
              id={option.value}
            />
            <label
              htmlFor={option.value}
              className={cx(
                "text-sm font-medium text-neutral-content",
                option.disabled &&
                  "text-neutral-content-muted cursor-not-allowed",
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </CoreRadioGroup>
    );
  },
});
