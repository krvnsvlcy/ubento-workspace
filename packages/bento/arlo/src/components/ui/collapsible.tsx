import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Collapsible as CoreCollapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../core/ui/collapsible.js";
import * as React from "react";

export const Collapsible = createComponent({
  props: z.object({
    trigger: z.any().optional(),
  }),

  bindings: z.object({
    open: z.boolean(),
  }),

  summary: "A collapsible container component.",
  instructions: [
    "Use this component to create expandable/collapsible content.",
    "The `open` binding controls the visibility.",
    "The `trigger` prop sets the element that toggles the state.",
    "Pass children to render inside the collapsible content.",
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
      <CoreCollapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild ref={ref}>
          {triggerElement || <button className="hidden" />}
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </CoreCollapsible>
    );
  },
});
