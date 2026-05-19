// Tremor Toggle [v1.0.0]
"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React from "react";

import { cx, focusRing } from "@/lib/utils.js";

const toggleStyles = [
  // base
  "group inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2 text-sm font-medium shadow-xs transition-all duration-100 ease-in-out",
  "border-neutral-border",
  // text color
  "text-neutral-content",
  // background color
  "bg-neutral-surface",
  //hover color
  "hover:bg-neutral-surface-hover",
  // disabled
  "disabled:pointer-events-none disabled:text-neutral-content-muted",
  "data-[state=on]:bg-neutral-surface-hover data-[state=on]:text-neutral-content",
  focusRing,
];

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cx(toggleStyles, className)}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cx(
      "flex items-center justify-center gap-1 flex-nowrap",
      className,
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cx(toggleStyles, className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
));

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
