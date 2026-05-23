import {
  Empty as CoreEmpty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const Empty = createComponent({
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.any().optional(),
  }),

  summary: "An empty state component.",
  instructions: [
    "Use this component to display a message when there is no data or content.",
    "The `title` and `description` props set the main message.",
    "The `icon` prop optionally displays an icon.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <CoreEmpty ref={ref}>
        <EmptyHeader>
          {props.icon && <EmptyMedia variant="icon">{props.icon}</EmptyMedia>}
          {props.title && <EmptyTitle>{props.title}</EmptyTitle>}
          {props.description && (
            <EmptyDescription>{props.description}</EmptyDescription>
          )}
        </EmptyHeader>
        {children}
      </CoreEmpty>
    );
  },
});
