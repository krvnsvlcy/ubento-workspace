import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  DropdownMenu as CoreDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ubento/bento.arlo-core";

export const DropdownMenu = createComponent({
  props: z.object({
    trigger: z.any().optional(),
    items: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disabled: z.boolean().optional(),
        }),
      )
      .default([]),
  }),

  events: z.object({
    select: z.object({ value: z.string() }),
  }),

  summary: "A dropdown menu component.",
  instructions: [
    "Use this component to display a list of actions or options.",
    "Provide a `trigger` element or string.",
    "Provide an `items` array with `label` and `value` for each item.",
    "The `select` event is emitted when an item is clicked.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    const triggerElement =
      typeof props.trigger === "string" ? (
        <button className="text-sm font-medium text-neutral-content-muted hover:text-neutral-content">
          {props.trigger}
        </button>
      ) : (
        props.trigger
      );

    return (
      <CoreDropdownMenu>
        <DropdownMenuTrigger asChild ref={ref}>
          {triggerElement || <button className="hidden" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              disabled={item.disabled}
              onSelect={() => emit("select", { value: item.value })}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </CoreDropdownMenu>
    );
  },
});
