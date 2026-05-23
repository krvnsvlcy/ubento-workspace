import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Callout as CoreCallout } from "@ubento/bento.arlo-core";

export const Alert = createComponent({
  props: z.object({
    title: z.string().optional(),
    variant: z
      .enum([
        "success",
        "warning",
        "neutral",
        "accent",
        "destructive",
        "info",
        "inverse",
      ])
      .default("neutral"),
  }),

  summary: "An alert component to display important messages.",
  instructions: [
    "Use this component to display important messages or callouts.",
    "The `variant` prop controls the color and style of the alert.",
    "You can provide a `title` and pass children for the content.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreCallout ref={ref} title={props.title || ""} variant={props.variant}>
        {children}
      </CoreCallout>
    );
  },
});
