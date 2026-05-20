import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Toast as CoreToast } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Toast = createComponent({
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    variant: z
      .enum(["info", "success", "warning", "error", "loading"])
      .default("info"),
  }),

  summary: "A toast notification component.",
  instructions: [
    "Use this component to display a toast notification.",
    "The `variant` prop controls the style and icon.",
    "The `title` and `description` props control the content.",
    "Note: This component requires a ToastProvider and ToastViewport to be mounted in the application.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <CoreToast
        ref={ref}
        title={props.title}
        description={props.description}
        variant={props.variant}
      />
    );
  },
});
