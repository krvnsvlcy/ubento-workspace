// Tremor Badge [v1.0.0]

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils.js";

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
  ),
  variants: {
    variant: {
      accent: [
        "bg-accent-surface text-accent-content ring-accent-border",
      ],
      neutral: [
        "bg-neutral-surface text-neutral-content ring-neutral-border",
      ],
      success: [
        "bg-success-surface text-success-content ring-success-border",
      ],
      destructive: [
        "bg-destructive-surface text-destructive-content ring-destructive-border",
      ],
      warning: [
        "bg-warning-surface text-warning-content ring-warning-border",
      ],
      info: [
        "bg-info-surface text-info-content ring-info-border",
      ],
      inverse: [
        "bg-inverse-surface text-inverse-content ring-inverse-border",
      ],
    },
  },
  defaultVariants: {
    variant: "accent",
  },
});

interface BadgeProps
  extends
    React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        tremor-id="tremor-raw"
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
