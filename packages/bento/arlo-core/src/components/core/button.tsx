import { Intent } from "@/intent";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      variant: {
        primary: "bg-intent text-intent-contrast hover:bg-intent-hover",
        secondary:
          "bg-intent-content/5 text-intent-content hover:bg-intent-content/10",
        "secondary-destructive":
          "bg-intent-content/5 text-intent-content hover:bg-destructive hover:text-destructive-contrast",
        outline:
          "border border-intent-border bg-transparent hover:bg-intent-surface text-intent-content",
        ghost:
          "text-intent-content hover:bg-intent-content/10 hover:text-intent-content",
        link: "text-intent-content-subtle hover:text-intent-content",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        icon: "",
      },
      shape: {
        rounded: "",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
      // shape + size
      {
        size: "sm",
        shape: "rounded",
        className: "rounded-lg",
      },
      {
        size: "md",
        shape: "rounded",
        className: "rounded-xl",
      },
      {
        size: "lg",
        shape: "rounded",
        className: "rounded-xl",
      },
      {
        size: "icon",
        shape: "rounded",
        className: "rounded-xl",
      },

      // variant + size
      {
        // all variants except link
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
        ],
        size: "sm",
        className: "h-6 px-2",
      },
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
        ],
        size: "md",
        className: "h-8 px-4",
      },
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
        ],
        size: "lg",
        className: "h-10 px-4",
      },
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
        ],
        size: "icon",
        className: "h-8 w-8",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "md",
      shape: "rounded",
      align: "center",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  intent?: Intent;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      align,
      intent,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, shape, align, className })}
        ref={ref}
        data-intent={intent}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
