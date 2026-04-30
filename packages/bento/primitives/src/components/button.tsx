import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-foreground/10 text-foreground hover:bg-foreground/20",
        primary: "bg-primary-300 text-white hover:bg-primary-300",
        destructive: "bg-red-500 text-white hover:bg-red-400",
        outline:
          "border border-dark-200 bg-transparent hover:bg-dark-100 text-dark-500",
        secondary: "bg-secondary-500 text-dark-500 hover:bg-secondary-400",
        ghost: "hover:bg-dark-100 hover:text-dark-500",
        link: "text-primary-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-7 px-3",
        sm: "h-9 px-3",
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
