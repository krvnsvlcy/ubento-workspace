import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Tabs as CoreTabs,
  TabsList,
  TabsTrigger,
} from "../../core/ui/tabs.js";
import * as React from "react";

export const Tabs = createComponent({
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
    variant: z.enum(["pill", "underline", "outline"]).default("pill"),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A tabs component for switching between views.",
  instructions: [
    "Use this component to switch between different views or contents.",
    "Provide an `items` array with `label` and `value` for each tab.",
    "The `variant` prop controls the visual style (`pill` or `underline`).",
    "The `value` binding controls the active tab.",
  ].join("\n"),

  render: ({ ref, props, bindings }) => {
    const {
      value: [value, setValue],
    } = bindings;

    const coreVariant = props.variant === "pill" ? "solid" : "line";

    return (
      <CoreTabs
        value={value}
        onValueChange={setValue}
      >
        <TabsList variant={coreVariant}>
          {props.items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </CoreTabs>
    );
  },
});
