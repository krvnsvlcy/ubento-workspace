// Tremor Label [v0.0.2]

import * as LabelPrimitives from "@radix-ui/react-label";
import React from "react";

import { cx } from "@/lib/utils.js";

interface LabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitives.Root
> {
  disabled?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitives.Root>,
  LabelProps
>(({ className, disabled, ...props }, forwardedRef) => (
  <LabelPrimitives.Root
    ref={forwardedRef}
    className={cx(
      // base
      "text-sm leading-none",
      // text color
      "text-neutral-content",
      // disabled
      {
        "text-neutral-content-muted": disabled,
      },
      className,
    )}
    aria-disabled={disabled}
    tremor-id="tremor-raw"
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
