import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Label as CoreLabel } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Label = createComponent({
  props: z.object({
    text: z.string().optional(),
    htmlFor: z.string().optional(),
    disabled: z.boolean().optional(),
  }),

  summary: "A label for form inputs.",
  instructions: [
    "Use this component to provide a label for an input field.",
    "Pass `htmlFor` to associate it with an input ID.",
    "Provide `text` or pass children for the label content.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreLabel
        ref={ref}
        htmlFor={props.htmlFor}
        disabled={props.disabled}
      >
        {props.text || children}
      </CoreLabel>
    );
  },
});
