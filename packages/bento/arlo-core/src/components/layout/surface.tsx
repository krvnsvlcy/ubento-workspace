import { cx } from "@/lib/utils.js";
import { Tone } from "@/tone";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const surfaceVariants = cva("transition-colors", {
  variants: {
    fill: {
      flat: "bg-background text-tone-content",
      subtle: "bg-tone-surface/50 text-tone-content",
      tinted: "bg-tone-surface text-tone-content",
      bold: "bg-tone text-tone-contrast",
    },
    interactive: {
      true: "cursor-pointer hover:bg-tone-surface-hover hover:border-tone-border-hover",
      false: "",
    },
  },
  defaultVariants: {
    fill: "bold",
    interactive: false,
  },
});

export interface SurfaceProps
  extends ComponentProps<"div">, VariantProps<typeof surfaceVariants> {
  tone?: Tone;
}

export const Surface = ({
  className,
  tone,
  fill,
  interactive,
  ...props
}: SurfaceProps) => {
  return (
    <div
      className={cx(surfaceVariants({ fill, interactive }), className)}
      data-tone={tone}
      {...props}
    />
  );
};

Surface.displayName = "Surface";
