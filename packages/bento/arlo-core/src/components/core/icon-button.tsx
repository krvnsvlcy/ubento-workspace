import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

export const iconButtonVariants = cva(
  "group flex items-center justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "hover:bg-neutral-surface text-neutral-content-muted hover:text-neutral-content",
        outline:
          "border border-neutral-border bg-neutral-surface hover:bg-neutral-surface-hover text-neutral-content-muted hover:text-neutral-content",
        ghost:
          "hover:bg-neutral-surface text-neutral-content-muted hover:text-neutral-content",
        primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
        lg: "h-10 w-10",
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

export interface IconButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={iconButtonVariants({ variant, size, shape, className })}
        {...props}
      >
        {icon || children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
