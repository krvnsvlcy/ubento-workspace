import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-accent-contrast hover:bg-accent-hover",
        secondary: "border-transparent bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover",
        destructive: "border-transparent bg-destructive text-destructive-contrast hover:bg-destructive-hover",
        outline: "text-neutral-content border-neutral-border",
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
