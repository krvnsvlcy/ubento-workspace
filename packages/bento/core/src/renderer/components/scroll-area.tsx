import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import * as React from "react";

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<
  typeof OverlayScrollbarsComponent
> {
  className?: string;
  children?: React.ReactNode;
  options?: any;
}

export function ScrollArea({
  className,
  children,
  options,
  ref,
  ...props
}: ScrollAreaProps) {
  return (
    <OverlayScrollbarsComponent
      ref={ref}
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
