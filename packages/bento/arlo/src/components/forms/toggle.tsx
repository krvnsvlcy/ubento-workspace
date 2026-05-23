import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import { Toggle as CoreToggle } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Toggle = createComponent({
  props: z.object({
    disabled: z.boolean().optional(),
    ariaLabel: z.string().optional(),
  }),

  bindings: z.object({
    pressed: z.boolean(),
  }),

  summary: "A two-state button component.",
  instructions: [
    "Use this component for a button that can be either on or off.",
    "The `pressed` binding controls the state.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    const [pressed, setPressed] = useBinding<boolean>("pressed");

    return (
      <CoreToggle
        ref={ref}
        pressed={pressed}
        onPressedChange={setPressed}
        disabled={props.disabled}
        aria-label={props.ariaLabel}
      >
        {children}
      </CoreToggle>
    );
  },
});
