import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Button as CoreButton } from "@ubento/bento.arlo-core";

export const Button = createComponent({
  props: z.object({
    label: z.string().optional(),
    variant: z
      .enum(["primary", "secondary", "light", "ghost", "destructive"])
      .default("primary"),
    size: z.enum(["small", "medium", "large"]).default("medium"),
    disabled: z.boolean().optional(),
  }),
  events: z.object({
    click: z.object(),
  }),

  summary: "Button component for triggering actions.",
  instructions: [
    "Use this component to trigger actions.",
    "This component can either display a label (from the label prop) or a child component.",
    "When a child component is provided, the label prop is ignored.",
    "The `variant` prop controls the visual style of the button.",
    "The `size` prop controls the size of the button.",
    "The `disabled` prop controls whether the button is disabled.",
    "The `click` event is emitted when the button is clicked.",
  ].join("\n"),

  render: ({ ref, props, children, emit }) => {
    return (
      <CoreButton
        ref={ref}
        disabled={props.disabled}
        variant={props.variant}
        onClick={() => emit("click", {})}
      >
        {props.label || children}
      </CoreButton>
    );
  },
});
