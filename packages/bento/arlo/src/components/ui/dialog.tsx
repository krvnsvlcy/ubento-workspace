import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Dialog as CoreDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../core/ui/dialog.js";
import * as React from "react";

export const Dialog = createComponent({
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),

  bindings: z.object({
    open: z.boolean(),
  }),

  summary: "A modal dialog component.",
  instructions: [
    "Use this component to display content in a modal overlay.",
    "The `open` binding controls the visibility of the dialog.",
    "The `title` and `description` props set the header content.",
    "Pass children to render inside the dialog content.",
  ].join("\n"),

  render: ({ ref, props, bindings, children }) => {
    const {
      open: [open, setOpen],
    } = bindings;

    return (
      <CoreDialog open={open} onOpenChange={setOpen}>
        <DialogContent ref={ref}>
          <DialogHeader>
            {props.title && <DialogTitle>{props.title}</DialogTitle>}
            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="mt-4">{children}</div>
        </DialogContent>
      </CoreDialog>
    );
  },
});
