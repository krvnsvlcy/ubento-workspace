import { ProgressBar as CoreProgressBar } from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const Progress = createComponent({
  props: z.object({
    value: z.number().min(0).max(100).optional(),
    max: z.number().default(100),
    variant: z
      .enum(["default", "neutral", "warning", "error", "success"])
      .default("default"),
    label: z.string().optional(),
    showAnimation: z.boolean().optional(),
  }),

  summary: "A progress bar component.",
  instructions: [
    "Use this component to display progress.",
    "The `value` prop controls the filled percentage.",
    "The `max` prop controls the max value.",
    "The `variant` prop controls the color.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <CoreProgressBar
        ref={ref}
        value={props.value}
        max={props.max}
        variant={props.variant}
        label={props.label}
        showAnimation={props.showAnimation}
      />
    );
  },
});
