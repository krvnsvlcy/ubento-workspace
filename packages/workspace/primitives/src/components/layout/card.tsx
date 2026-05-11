import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

export const cardVariants = cva(
  "rounded-xl border border-neutral-border bg-background text-neutral-content shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-none shadow-none bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  gap?: number | string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, style, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, className })}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: typeof gap === "number" ? `${gap}px` : gap,
        ...style,
      }}
      {...props}
    />
  ),
);
