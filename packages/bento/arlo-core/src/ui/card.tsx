import { Intent } from "@/intent";
import { cx } from "@/lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const cardVariants = cva("relative w-full rounded-2xl text-left", {
  variants: {
    variant: {
      outline: "bg-background border border-intent-border",
      surface: "bg-intent-surface border border-intent-border",
      "surface-interactive":
        "bg-intent-surface border border-intent-border hover:border-intent-border-hover hover:bg-intent-surface-hover transition-colors cursor-pointer",
      ghost: "border-transparent bg-transparent",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6", // Your original 24px default
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "surface",
    padding: "md",
  },
});

export interface CardProps
  extends ComponentProps<"div">, VariantProps<typeof cardVariants> {
  intent?: Intent;
}

export const Card = ({
  className,
  variant,
  padding,
  intent,
  ref,
  ...props
}: CardProps) => {
  return (
    <div
      ref={ref}
      className={cx(cardVariants({ variant, padding }), className)}
      data-intent={intent}
      {...props}
    />
  );
};

Card.displayName = "Card";
