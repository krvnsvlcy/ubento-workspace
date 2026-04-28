import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-500 text-white hover:bg-primary-400",
        secondary: "border-transparent bg-secondary-500 text-dark-500 hover:bg-secondary-400",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-400",
        outline: "text-dark-500 border-dark-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={badgeVariants({ variant, className })} {...props} />
    );
  }
);
Badge.displayName = "Badge";
