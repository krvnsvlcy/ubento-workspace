// Tremor Radio Card [v1.0.0]

import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import React from "react";

import { cx, focusInput, focusRing } from "@/lib/utils.js";

const RadioCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Root
      ref={forwardedRef}
      className={cx("grid gap-2", className)}
      tremor-id="tremor-raw"
      {...props}
    />
  );
});

RadioCardGroup.displayName = "RadioCardGroup";

const RadioCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Item
      ref={forwardedRef}
      className={cx(
        // base
        "group relative w-full rounded-md border p-4 text-left shadow-xs transition focus:outline-hidden",
        // background color
        "bg-neutral-surface",
        // border color
        "border-neutral-border",
        "data-[state=checked]:border-blue-500",
        "dark:data-[state=checked]:border-blue-500",
        // disabled
        "data-disabled:border-neutral-border",
        "data-disabled:bg-neutral-surface data-disabled:shadow-none",
        focusInput,
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitives.Item>
  );
});

RadioCardItem.displayName = "RadioCardItem";

const RadioCardIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Indicator>
>(({ className, ...props }, forwardedRef) => {
  return (
    <div
      className={cx(
        // base
        "relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border shadow-xs outline-hidden",
        // border color
        "border-neutral-border",
        // background color
        "bg-neutral-surface",
        // checked
        "group-data-[state=checked]:border-0 group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-blue-500",
        // disabled
        "group-data-disabled:border-neutral-border group-data-disabled:bg-neutral-surface group-data-disabled:text-neutral-content-muted",
        // focus
        focusRing,
        className,
      )}
    >
      <RadioGroupPrimitives.Indicator
        ref={forwardedRef}
        className={cx("flex items-center justify-center")}
        {...props}
      >
        <div
          className={cx(
            // base
            "size size-1.5 shrink-0 rounded-full",
            // indicator
            "bg-accent-contrast",
            // disabled
            "group-data-disabled:text-neutral-content-muted",
          )}
        />
      </RadioGroupPrimitives.Indicator>
    </div>
  );
});

RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
