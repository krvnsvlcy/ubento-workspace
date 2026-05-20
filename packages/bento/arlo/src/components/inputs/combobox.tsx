import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Combobox as CoreCombobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@ubento/bento.arlo-core";
import * as React from "react";

export const Combobox = createComponent({
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

  summary: "A combobox component with search and selection.",
  instructions: [
    "Use this component to allow users to search and select an option from a list.",
    "Provide an `options` array with `label` and `value` for each option.",
    "The `value` binding controls the selected option.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    return (
      <CoreCombobox
        value={value}
        onValueChange={(v) => setValue(v || "")}
        disabled={props.disabled}
      >
        <ComboboxInput
          ref={ref}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        <ComboboxContent>
          <ComboboxList>
            {props.options.map((opt) => (
              <ComboboxItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </CoreCombobox>
    );
  },
});
