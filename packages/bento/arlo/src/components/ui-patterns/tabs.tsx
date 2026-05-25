import {
  Tabs as CoreTabs,
  TabsList,
  TabsTrigger,
} from "@ubento/bento.arlo-core";
import { createComponent, useBinding } from "@ubento/bento.core";
import { useRef } from "react";
import { z } from "zod";

let i = 1;
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

  render: ({ ref, props }) => {
    const key = useRef<number>(++i);
    const [value, setValue] = useBinding<string>("value");

    const coreVariant = props.variant === "pill" ? "solid" : "line";

    return (
      <CoreTabs
        ref={ref}
        value={value}
        onValueChange={(v) => {
          console.log("onValueChange", { key: key.current, value, next: v });
          setValue(v);
        }}
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
