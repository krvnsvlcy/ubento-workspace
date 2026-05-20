"use client";

import { cx } from "@/lib/utils.js";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import * as React from "react";
import "overlayscrollbars/overlayscrollbars.css";

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof OverlayScrollbarsComponent> {
  className?: string;
  children?: React.ReactNode;
  options?: any;
}

const ScrollArea = React.forwardRef<any, ScrollAreaProps>(
  ({ className, children, options, ...props }, ref) => {
    return (
      <OverlayScrollbarsComponent
        ref={ref}
        className={cx("h-full w-full", className)}
        options={{
          scrollbars: {
            autoHide: "scroll",
            ...options?.scrollbars,
          },
          ...options,
        }}
        defer
        {...props}
      >
        {children}
      </OverlayScrollbarsComponent>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<any, any>((props, ref) => {
  return null;
});
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
