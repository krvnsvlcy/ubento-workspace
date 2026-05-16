import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  TabNavigation as CoreTabNavigation,
  TabNavigationLink,
} from "../../core/ui/tab-navigation.js";
import * as React from "react";

export const TabNavigation = createComponent({
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
  }),

  bindings: z.object({
    value: z.string(),
  }),

  events: z.object({
    change: z.object({ value: z.string() }),
  }),

  summary: "A tab-based navigation component.",
  instructions: [
    "Use this component for navigation between different views or pages.",
    "Provide an `items` array with `label` and `value` for each tab.",
    "The `value` binding controls the active tab.",
    "The `change` event is emitted when a tab is clicked.",
  ].join("\n"),

  render: ({ ref, props, bindings, emit }) => {
    const {
      value: [value, setValue],
    } = bindings;

    return (
      <CoreTabNavigation ref={ref}>
        {props.items.map((item) => (
          <TabNavigationLink
            key={item.value}
            active={item.value === value}
            disabled={item.disabled}
            onClick={() => {
              setValue(item.value);
              emit("change", { value: item.value });
            }}
          >
            {item.label}
          </TabNavigationLink>
        ))}
      </CoreTabNavigation>
    );
  },
});
