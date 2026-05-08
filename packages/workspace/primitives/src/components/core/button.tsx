import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover",
        primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
        destructive:
          "bg-destructive text-destructive-contrast hover:bg-destructive-hover",
        outline:
          "border border-neutral-border bg-transparent hover:bg-neutral-surface text-neutral-content",
        secondary:
          "bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover",
        ghost: "hover:bg-neutral-surface hover:text-neutral-content",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-7 px-3",
        sm: "h-7 px-3",
        lg: "h-11 px-8",
        icon: "h-7 w-7",
      },
      shape: {
        rounded: "rounded-lg",
        square: "rounded-sm",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, shape, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
