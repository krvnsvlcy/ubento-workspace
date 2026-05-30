// Tremor Callout [v0.0.1]

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils.js";

const calloutVariants = tv({
  base: "flex flex-col overflow-hidden rounded-md p-4 text-sm",
  variants: {
    variant: {
      accent: ["text-content", "bg-surface"],
      success: ["text-content", "bg-surface"],
      destructive: ["text-content", "bg-surface"],
      warning: ["text-content", "bg-surface"],
      neutral: ["text-content", "bg-surface"],
      info: ["text-content", "bg-surface"],
      inverse: ["text-content", "bg-surface"],
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
        data-tone={variant || "accent"}
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
