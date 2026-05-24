// Tremor Slider [v1.0.0]

"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cx, focusRing } from "@/lib/utils.js";

interface SliderProps extends React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> {
  ariaLabelThumb?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ariaLabelThumb, ...props }, forwardedRef) => {
  const value = props.value || props.defaultValue;
  return (
    <SliderPrimitive.Root
      ref={forwardedRef}
      className={cx(
        // base
        "relative flex cursor-pointer touch-none select-none",
        // orientation
        "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
        "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
        // disabled
        "data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cx(
          // base
          "relative grow overflow-hidden rounded-full bg-neutral-border",
          // orientation
          "data-[orientation='horizontal']:h-1.5 data-[orientation='horizontal']:w-full",
          "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          className={cx(
            // base
            "absolute rounded-full bg-blue-500 dark:bg-blue-500",
            // orientation
            "data-[orientation='horizontal']:h-full",
            "data-[orientation='vertical']:w-full",
            // disabled
            "data-disabled:bg-neutral-content-muted",
          )}
        />
      </SliderPrimitive.Track>
      {value?.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cx(
            // base
            "block size-[17px] shrink-0 rounded-full border shadow-sm transition-all",
            // border color
            "border-neutral-border",
            // background color
            "bg-neutral-surface",
            // disabled
            "data-disabled:pointer-events-none data-disabled:bg-neutral-surface data-disabled:border-neutral-border",
            focusRing,
            "outline-offset-0",
          )}
          aria-label={ariaLabelThumb}
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
