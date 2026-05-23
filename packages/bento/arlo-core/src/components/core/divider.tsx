// Tremor Divider [v1.0.0]

import React from "react";

import { cx } from "@/lib/utils.js";

type DividerProps = React.ComponentPropsWithoutRef<"div"> & {
  noMargin?: boolean;
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, children, noMargin, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cx(
        // base
        "mx-auto  flex w-full items-center justify-between gap-3 text-sm",
        // text color
        "text-tone-content-muted",
        {
          "my-6": !noMargin,
        },
        className,
      )}
      {...props}
    >
      {children ? (
        <>
          <div
            className={cx(
              // base
              "h-[1px] w-full",
              // background color
              "bg-tone-border",
            )}
          />
          <div className="whitespace-nowrap text-inherit">{children}</div>
          <div
            className={cx(
              // base
              "h-[1px] w-full",
              // background color
              "bg-tone-border",
            )}
          />
        </>
      ) : (
        <div
          className={cx(
            // base
            "h-[1px] w-full",
            // background color
            "bg-tone-border",
          )}
        />
      )}
    </div>
  ),
);

Divider.displayName = "Divider";

export { Divider };
