import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  HoverCard as CoreHoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ubento/bento.arlo-core";
import * as React from "react";

export const HoverCard = createComponent({
  props: z.object({
    content: z.any().optional(),
    openDelay: z.number().default(700),
    closeDelay: z.number().default(300),
  }),

  summary: "A hover card component for displaying preview content.",
  instructions: [
    "Use this component to display a card when the user hovers over an element.",
    "The `content` prop sets the content to display in the card.",
    "Wrap the target element with this component.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreHoverCard openDelay={props.openDelay} closeDelay={props.closeDelay}>
        <HoverCardTrigger asChild ref={ref}>
          {children || <span className="underline decoration-dotted cursor-help text-blue-500">Hover me</span>}
        </HoverCardTrigger>
        <HoverCardContent>
          {props.content || <div>Preview content</div>}
        </HoverCardContent>
      </CoreHoverCard>
    );
  },
});
