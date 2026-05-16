import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Select as CoreSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../core/inputs/select.js";
import * as React from "react";

export const Select = createComponent({
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
    placeholder: z.string().optional(),
    disabled: z.boolean().optional(),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A select dropdown component.",
  instructions: [
    "Use this component to allow users to select an option from a dropdown.",
    "Provide an `options` array with `label` and `value` for each option.",
    "The `value` binding controls the selected option.",
    "The `placeholder` prop sets the text when no option is selected.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    return (
      <CoreSelect
        value={value}
        onValueChange={setValue}
        disabled={props.disabled}
      >
        <SelectTrigger ref={ref}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </CoreSelect>
    );
  },
});
