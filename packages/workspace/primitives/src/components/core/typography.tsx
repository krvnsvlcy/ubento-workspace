import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

/* ---------- Heading ---------- */

const heading = cva("font-medium leading-tight tracking-tight", {
  variants: {
    level: {
      display: "text-3xl",
      h1: "text-xl font-semibold",
      h2: "text-lg font-semibold",
      h3: "text-md font-semibold",
      h4: "text-sm font-semibold",
    },
    tone: {
      default: "text-default",
      muted: "text-muted",
    },
  },
  defaultVariants: {
    level: "h2",
    tone: "default",
  },
});

type HeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof heading> & {
    as?: "h1" | "h2" | "h3" | "h4" | "div";
  };

export function Heading({
  as: Tag = "h2",
  level,
  tone,
  className,
  ...props
}: HeadingProps) {
  return <Tag className={cx(heading({ level, tone }), className)} {...props} />;
}

/* ---------- Text ---------- */

const text = cva("leading-normal", {
  variants: {
    size: {
      md: "text-sm",
      lg: "text-md",
      xl: "text-lg",
      sm: "text-xs",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    tone: {
      default: "text-neutral-content",
      muted: "text-neutral-content-muted",
      subtle: "text-neutral-content-subtle",
      danger: "text-red-500",
      warning: "text-orange-500",
      success: "text-green-500",
      primary: "text-accent",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    tone: "default",
  },
});

type TextProps = React.ComponentProps<"p"> &
  VariantProps<typeof text> & {
    as?: "p" | "span" | "div";
  };

export function Text({
  as: Tag = "p",
  size,
  weight,
  tone,
  className,
  ...props
}: TextProps) {
  return (
    <Tag className={cx(text({ size, weight, tone }), className)} {...props} />
  );
}

/* ---------- Code ---------- */

export function Code({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cx(
        "text-xs leading-snug rounded-md p-3 bg-muted overflow-auto",
        className
      )}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className={cx(
        "text-xs font-medium leading-snug rounded-sm px-1 py-0.5 bg-muted",
        className
      )}
      {...props}
    />
  );
}
