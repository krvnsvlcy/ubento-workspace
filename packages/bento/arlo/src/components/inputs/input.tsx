import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Input as CoreInput } from "../../core/inputs/input.js";

export const Input = createComponent({
  props: z.object({
    placeholder: z.string().optional(),
    type: z
      .enum(["text", "password", "email", "number", "tel", "url"])
      .default("text"),
    size: z.enum(["small", "medium", "large"]).default("medium"),
    disabled: z.boolean().optional(),
    readOnly: z.boolean().optional(),
  }),

  bindings: z.object({
    value: z.string(),
  }),

  summary: "A form input field.",
  instructions: ["Use this component to capture user input."].join("\n"),

  render: ({ ref, props, bindings }) => {
    const { value } = bindings;

    return (
      <CoreInput
        ref={ref}
        type={props.type}
        value={value?.[0] as string}
        onChange={(e) => value?.[1]?.(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    );
  },
});
