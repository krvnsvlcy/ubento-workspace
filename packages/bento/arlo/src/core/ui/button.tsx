// Tremor Button [v1.0.0]

import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusRing } from "@/lib/utils.js";

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border text-center text-sm font-medium shadow-xs transition-all duration-100 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        "border-transparent",
        "text-accent-contrast",
        "bg-accent",
        "hover:bg-accent-hover",
        "disabled:bg-accent-surface disabled:text-accent-content-muted",
      ],
      secondary: [
        "border-neutral-border",
        "text-neutral-content",
        "bg-neutral-surface",
        "hover:bg-neutral-surface-hover",
        "disabled:text-neutral-content-muted",
      ],
      light: [
        "shadow-none",
        "border-transparent",
        "text-neutral-content",
        "bg-neutral-surface",
        "hover:bg-neutral-surface-hover",
        "disabled:bg-neutral-surface disabled:text-neutral-content-muted",
      ],
      ghost: [
        "shadow-none",
        "border-transparent",
        "text-neutral-content",
        "bg-transparent hover:bg-neutral-surface-hover",
        "disabled:text-neutral-content-muted",
      ],
      destructive: [
        "text-destructive-contrast",
        "border-transparent",
        "bg-destructive",
        "hover:bg-destructive-hover",
        "disabled:bg-destructive-surface disabled:text-destructive-content-muted",
      ],
    },
    size: {
      default: "px-3 py-2",
      sm: "px-2 py-1 text-xs",
      "icon-xs": "p-1 size-7",
      "icon-sm": "p-1.5 size-8",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      size,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        tremor-id="tremor-raw"
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <Loader2
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
