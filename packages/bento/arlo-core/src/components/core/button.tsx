import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      align: {
        default: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      variant: {
        default:
          "bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover",
        primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
        destructive:
          "bg-destructive text-destructive-contrast hover:bg-destructive-hover",
        "subtle-destructive":
          "bg-neutral-content/10 text-neutral-content hover:bg-destructive hover:text-destructive-contrast",
        outline:
          "border border-neutral-border bg-transparent hover:bg-neutral-surface text-neutral-content",
        secondary:
          "bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover",
        ghost: "hover:bg-neutral-content/10 hover:text-neutral-content",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-6 px-2",
        md: "h-8 px-4",
        lg: "h-10 px-4",
        icon: "h-7 w-7",
      },
      shape: {
        rounded: "",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
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
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
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
