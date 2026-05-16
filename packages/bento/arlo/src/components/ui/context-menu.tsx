import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  ContextMenu as CoreContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../core/ui/context-menu.js";
import * as React from "react";

export const ContextMenu = createComponent({
  props: z.object({
    items: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disabled: z.boolean().optional(),
          variant: z.enum(["default", "destructive"]).default("default"),
        }),
      )
      .default([]),
  }),

  events: z.object({
    select: z.object({ value: z.string() }),
  }),

  summary: "A context menu component triggered by right-click.",
  instructions: [
    "Use this component to display a menu when the user right-clicks the children.",
    "Provide an `items` array with `label` and `value` for each item.",
    "The `select` event is emitted when an item is clicked.",
    "Wrap the target element with this component.",
  ].join("\n"),

  render: ({ ref, props, children, emit }) => {
    return (
      <CoreContextMenu>
        <ContextMenuTrigger asChild ref={ref}>
          {children || <div className="p-4 border border-dashed text-center">Right click me</div>}
        </ContextMenuTrigger>
        <ContextMenuContent>
          {props.items.map((item) => (
            <ContextMenuItem
              key={item.value}
              disabled={item.disabled}
              variant={item.variant}
              onSelect={() => emit("select", { value: item.value })}
            >
              {item.label}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </CoreContextMenu>
    );
  },
});
