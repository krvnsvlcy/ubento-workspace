import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import { Switch as CoreSwitch } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Switch = createComponent({
  props: z.object({
    disabled: z.boolean().optional(),
    size: z.enum(["default", "small"]).default("default"),
  }),

  bindings: z.object({
    checked: z.boolean(),
  }),

  summary: "A switch toggle component.",
  instructions: [
    "Use this component to toggle a boolean value.",
    "The `checked` binding controls the state of the switch.",
    "The `size` prop controls the size of the switch.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const [checked, setChecked] = useBinding<boolean>("checked");

    return (
      <CoreSwitch
        ref={ref}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={props.disabled}
        size={props.size}
      />
    );
  },
});
