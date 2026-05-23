import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import {
  ToggleGroup as CoreToggleGroup,
  ToggleGroupItem,
} from "@ubento/bento.arlo-core";
import * as React from "react";

export const ToggleGroup = createComponent({
  props: z.object({
    items: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disabled: z.boolean().optional(),
        }),
      )
      .default([]),
    type: z.enum(["single", "multiple"]).default("single"),
  }),

  bindings: z.object({
    value: z.union([z.string(), z.array(z.string())]),
  }),

  summary: "A toggle group component for selection.",
  instructions: [
    "Use this component to allow users to select one or more options from a group.",
    "Provide an `items` array with `label` and `value` for each option.",
    "The `type` prop controls whether single or multiple options can be selected.",
    "The `value` binding controls the selected value(s).",
  ].join("\n"),

  render: ({ ref, props }) => {
    const [value, setValue] = useBinding<any>("value");

    return (
      <CoreToggleGroup
        ref={ref}
        type={props.type as any}
        value={value as any}
        onValueChange={setValue as any}
      >
        {props.items.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </CoreToggleGroup>
    );
  },
});
