import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import { Textarea as CoreTextarea } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Textarea = createComponent({
  props: z.object({
    placeholder: z.string().optional(),
    disabled: z.boolean().optional(),
    readOnly: z.boolean().optional(),
    rows: z.number().default(3),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A multi-line text input field.",
  instructions: [
    "Use this component to capture multi-line text input.",
    "The `value` binding controls the content of the textarea.",
    "The `rows` prop controls the initial height.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const [value, setValue] = useBinding<string>("value");

    return (
      <CoreTextarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        rows={props.rows}
      />
    );
  },
});
