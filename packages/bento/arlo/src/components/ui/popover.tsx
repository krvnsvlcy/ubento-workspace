import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Popover as CorePopover,
  PopoverContent,
  PopoverTrigger,
} from "../../core/ui/popover.js";
import * as React from "react";

export const Popover = createComponent({
  props: z.object({
    trigger: z.any().optional(),
  }),

  bindings: z.object({
    open: z.boolean(),
  }),

  summary: "A popover component to display content in a portal.",
  instructions: [
    "Use this component to display content in a popover.",
    "The `open` binding controls the visibility.",
    "The `trigger` prop sets the element that opens the popover.",
    "Pass children to render inside the popover content.",
  ].join("\n"),

  render: ({ ref, props, bindings, children }) => {
    const {
      open: [open, setOpen],
    } = bindings;

    const triggerElement = typeof props.trigger === "string" ? (
      <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
        {props.trigger}
      </button>
    ) : props.trigger;

    return (
      <CorePopover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {triggerElement || <button className="hidden" />}
        </PopoverTrigger>
        <PopoverContent ref={ref}>
          {children}
        </PopoverContent>
      </CorePopover>
    );
  },
});
