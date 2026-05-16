import { cx } from "@/lib/utils.js";
import * as React from "react";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("relative flex items-center w-full", className)}
      {...props}
    />
  );
});
InputGroup.displayName = "InputGroup";

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cx(
        "flex-1 rounded-md border border-gray-300 dark:border-gray-800 px-3 py-2 text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50",
        className,
      )}
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    align?: "inline-end" | "inline-start";
  }
>(({ className, align = "inline-end", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(
        "absolute flex items-center justify-center",
        align === "inline-end" ? "right-2" : "left-2",
        className,
      )}
      {...props}
    />
  );
});
InputGroupAddon.displayName = "InputGroupAddon";

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    variant?: string;
    size?: string;
    render?: React.ReactElement;
  }
>(({ className, render, ...props }, ref) => {
  const Element = render ? (
    React.cloneElement(render, props as any)
  ) : (
    <button {...props} />
  );
  return (
    <div
      ref={ref as any}
      className={cx(
        "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center",
        className,
      )}
    >
      {Element}
    </div>
  );
});
InputGroupButton.displayName = "InputGroupButton";

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput };
