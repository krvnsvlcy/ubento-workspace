import * as AccordionPrimitives from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import React from "react";

import { cx } from "@/lib/utils.js";

const Accordion = AccordionPrimitives.Root;

Accordion.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Header className="flex">
    <AccordionPrimitives.Trigger
      className={cx(
        // base
        "group flex flex-1 cursor-pointer items-center justify-between py-3 text-left text-sm leading-none font-medium",
        // text color
        "text-content",
        // disabled
        "data-disabled:cursor-default data-disabled:text-content-muted",
        //focus
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-border focus-visible:outline-hidden focus-visible:ring-inset",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <Plus
        className={cx(
          // base
          "size-5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:-rotate-45",
          // text color
          "text-content-subtle",
          // disabled
          "group-data-disabled:text-content-muted",
        )}
        aria-hidden="true"
        focusable="false"
      />
    </AccordionPrimitives.Trigger>
  </AccordionPrimitives.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Content>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Content
    ref={forwardedRef}
    className={cx(
      "data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open transform-gpu",
    )}
    {...props}
  >
    <div
      className={cx(
        // base
        "overflow-hidden pb-4 text-sm",
        // text color
        "text-content-subtle",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitives.Content>
));

AccordionContent.displayName = "AccordionContent";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Item
    ref={forwardedRef}
    className={cx(
      // base
      "overflow-hidden border-b first:mt-0",
      // border color
      "border-border",
      className,
    )}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
