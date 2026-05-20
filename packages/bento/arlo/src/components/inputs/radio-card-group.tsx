import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  RadioCardGroup as CoreRadioCardGroup,
  RadioCardItem,
  RadioCardIndicator,
} from "@ubento/bento.arlo-core";
import * as React from "react";

export const RadioCardGroup = createComponent({
  props: z.object({
    options: z.array(
      z.object({
        label: z.string(),
        description: z.string().optional(),
        value: z.string(),
        disabled: z.boolean().optional(),
      })
    ),
    disabled: z.boolean().optional(),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A radio group component with card-style items.",
  instructions: [
    "Use this component to allow users to select one option from a list of cards.",
    "Provide an `options` array with `label`, `value`, and optional `description`.",
    "The `value` binding controls the selection.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    return (
      <CoreRadioCardGroup
        ref={ref}
        value={value}
        onValueChange={setValue}
        disabled={props.disabled}
      >
        {props.options.map((opt) => (
          <RadioCardItem
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
            className="flex items-start gap-3"
          >
            <RadioCardIndicator />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-content">
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-sm text-neutral-content-muted">
                  {opt.description}
                </span>
              )}
            </div>
          </RadioCardItem>
        ))}
      </CoreRadioCardGroup>
    );
  },
});
