import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { Card as CoreCard } from "@ubento/bento.arlo-core";
import * as React from "react";

export const Card = createComponent({
  props: z.object({
    asChild: z.boolean().optional(),
  }),

  summary: "A card container component.",
  instructions: [
    "Use this component to group content in a styled container.",
    "Pass children to render inside the card.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreCard
        ref={ref}
        asChild={props.asChild}
      >
        {children}
      </CoreCard>
    );
  },
});
