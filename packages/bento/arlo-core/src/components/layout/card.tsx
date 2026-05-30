import { cx } from "@/lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { Tone } from "../../tone";

const cardVariants = cva("relative w-full rounded-2xl text-left", {
  variants: {
    variant: {
      outline: "bg-background border border-border",
      surface: "bg-surface border border-border",
      "surface-interactive":
        "bg-surface border border-border hover:border-border-hover hover:bg-surface-hover transition-colors cursor-pointer",
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
    variant: "outline",
    padding: "md",
  },
});

export interface CardProps
  extends ComponentProps<"div">, VariantProps<typeof cardVariants> {
  tone?: Tone;
  gap?: number | string;
}

export const Card = ({
  className,
  variant,
  padding,
  tone,
  gap,
  style,
  ...props
}: CardProps) => {
  const gapStyle =
    gap !== undefined
      ? {
          display: "flex",
          flexDirection: "column" as const,
          gap: typeof gap === "number" ? `${gap}px` : gap,
        }
      : {};

  return (
    <div
      className={cx(cardVariants({ variant, padding }), className)}
      style={{
        ...gapStyle,
        ...style,
      }}
      data-tone={tone}
      {...props}
    />
  );
};

Card.displayName = "Card";
