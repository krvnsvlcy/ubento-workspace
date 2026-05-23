import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import { Input as CoreInput } from "@ubento/bento.arlo-core";

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

  render: ({ ref, props }) => {
    const [value, setValue] = useBinding<string>("value");

    return (
      <CoreInput
        ref={ref}
        type={props.type}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    );
  },
});
