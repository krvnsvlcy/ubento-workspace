import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Spinner as CoreSpinner } from "../../core/ui/spinner.js";
import * as React from "react";

export const Spinner = createComponent({
  props: z.object({
    className: z.string().optional(),
  }),

  summary: "A loading spinner component.",
  instructions: [
    "Use this component to indicate loading state.",
    "The `className` prop can be used to set size or color.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return <CoreSpinner ref={ref as any} className={props.className} />;
  },
});
