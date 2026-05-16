import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Checkbox as CoreCheckbox } from "../../core/inputs/checkbox.js";
import * as React from "react";

export const Checkbox = createComponent({
  props: z.object({
    disabled: z.boolean().optional(),
  }),

  bindings: z.object({
    checked: z.boolean(),
  }),

  summary: "A checkbox input field.",
  instructions: [
    "Use this component to capture a boolean choice.",
    "The `checked` binding controls the state of the checkbox.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      checked: [checked, setChecked],
    } = bindings;

    return (
      <CoreCheckbox
        ref={ref}
        checked={checked}
        onCheckedChange={(val) => setChecked(val === true)}
        disabled={props.disabled}
      />
    );
  },
});
