import { createComponent, useBinding } from "@ubento/bento.core";
import { z } from "zod";
import {
  Collapsible as CoreCollapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ubento/bento.arlo-core";
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

  render: ({ ref, props, children }) => {
    const [open, setOpen] = useBinding<boolean>("open");

    const triggerElement = typeof props.trigger === "string" ? (
      <button className="text-sm font-medium text-neutral-content-muted hover:text-neutral-content">
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
