import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  Drawer as CoreDrawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../core/ui/drawer.js";
import * as React from "react";

export const Drawer = createComponent({
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),

  bindings: z.object({
    open: z.boolean(),
  }),

  summary: "A drawer component that slides in from the side.",
  instructions: [
    "Use this component to display content in a side drawer.",
    "The `open` binding controls the visibility of the drawer.",
    "The `title` and `description` props set the header content.",
    "Pass children to render inside the drawer body.",
  ].join("\n"),

  render: ({ ref, props, bindings, children }) => {
    const {
      open: [open, setOpen],
    } = bindings;

    return (
      <CoreDrawer open={open} onOpenChange={setOpen}>
        <DrawerContent ref={ref}>
          <DrawerHeader>
            {props.title && <DrawerTitle>{props.title}</DrawerTitle>}
            {props.description && (
              <DrawerDescription>{props.description}</DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </CoreDrawer>
    );
  },
});
