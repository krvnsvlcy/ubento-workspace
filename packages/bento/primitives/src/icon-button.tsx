import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

export const iconButtonVariants = cva(
  "group flex items-center justify-center rounded-lg transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "hover:bg-foreground/10 text-foreground-400 hover:text-foreground",
        outline:
          "border border-foreground/5 bg-foreground/5 hover:bg-foreground/10 text-foreground-400 hover:text-foreground",
        ghost:
          "hover:bg-foreground/10 text-foreground-400 hover:text-foreground",
        primary: "bg-primary-500 text-white hover:bg-primary-600",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={iconButtonVariants({ variant, size, className })}
        {...props}
      >
        {icon || children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
