// Tremor Callout [v0.0.1]

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils.js";

const calloutVariants = tv({
  base: "flex flex-col overflow-hidden rounded-md p-4 text-sm",
  variants: {
    variant: {
      accent: ["text-accent-content", "bg-accent-surface"],
      success: ["text-success-content", "bg-success-surface"],
      destructive: ["text-destructive-content", "bg-destructive-surface"],
      warning: ["text-warning-content", "bg-warning-surface"],
      neutral: ["text-neutral-content", "bg-neutral-surface"],
      info: ["text-info-content", "bg-info-surface"],
      inverse: ["text-inverse-content", "bg-inverse-surface"],
    },
  },
  defaultVariants: {
    variant: "accent",
  },
});

interface CalloutProps
  extends
    React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof calloutVariants> {
  title: string;
  icon?: React.ElementType | React.ReactElement;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    { title, icon: Icon, className, variant, children, ...props }: CalloutProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(calloutVariants({ variant }), className)}
        {...props}
      >
        <div className={cx("flex items-start")}>
          {Icon && typeof Icon === "function" ? (
            <Icon
              className={cx("mr-1.5 h-5 w-5 shrink-0")}
              aria-hidden="true"
            />
          ) : (
            Icon
          )}
          <span className={cx("font-semibold")}>{title}</span>
        </div>
        <div className={cx("overflow-y-auto", children ? "mt-2" : "")}>
          {children}
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";

export { Callout, calloutVariants, type CalloutProps };
