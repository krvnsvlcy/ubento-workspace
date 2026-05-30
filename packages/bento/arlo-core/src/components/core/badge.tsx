import { Tone } from "@/tone";
import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
  {
    variants: {
      variant: {
        default: "border-transparent bg-base text-contrast hover:bg-hover",
        secondary: "border-transparent bg-surface text-content hover:bg-surface-hover",
        destructive: "border-transparent bg-base text-contrast hover:bg-hover",
        outline: "text-content border-border",
        // Tremor variants
        accent: "bg-surface text-content border-border",
        neutral: "bg-surface text-content border-border",
        success: "bg-surface text-content border-border",
        warning: "bg-surface text-content border-border",
        info: "bg-surface text-content border-border",
        inverse: "bg-surface text-content border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  tone?: Tone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, tone, ...props }, ref) => {
    const resolvedTone = tone || (
      variant === "default"
        ? "accent"
        : variant === "destructive"
        ? "destructive"
        : variant === "secondary" || variant === "outline"
        ? "neutral"
        : (variant as Tone)
    );

    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, className })}
        data-tone={resolvedTone}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
