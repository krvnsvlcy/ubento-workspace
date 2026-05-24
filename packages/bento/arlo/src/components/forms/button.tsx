import { Button as CoreButton, Spinner } from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const Button = createComponent({
  props: z.object({
    label: z.string().optional(),
    variant: z
      .enum(["primary", "secondary", "light", "ghost", "destructive"])
      .default("primary"),
    size: z.enum(["small", "medium", "large"]).default("medium"),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
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
    "The `loading` prop controls whether the button is loading.",
    "When the button is loading, it will display a spinner and the button will be disabled.",
  ].join("\n"),

  render: ({ ref, props, children, emit }) => {
    return (
      <CoreButton
        ref={ref}
        disabled={props.disabled || props.loading}
        variant={props.variant === "light" ? "secondary" : props.variant}
        onClick={() => emit("click", {})}
      >
        {props.loading && <Spinner />}
        {props.label || children}
      </CoreButton>
    );
  },
});
