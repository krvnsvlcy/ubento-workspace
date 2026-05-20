import { Intent } from "@/intent";
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
      default: "text-intent-content",
      subtle: "text-intent-content-subtle",
      muted: "text-intent-content-muted",
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
    intent?: Intent;
  };

export function Heading({
  as: Tag = "h2",
  level,
  tone,
  intent,
  className,

  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cx(heading({ level, tone }), className)}
      {...props}
      data-intent={intent}
    />
  );
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
      default: "text-intent-content",
      muted: "text-intent-content-muted",
      subtle: "text-intent-content-subtle",
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
    intent?: Intent;
  };

export function Text({
  as: Tag = "p",
  size,
  weight,
  tone,
  className,
  intent,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cx(text({ size, weight, tone }), className)}
      {...props}
      data-intent={intent}
    />
  );
}

/* ---------- Code ---------- */

export function Code({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cx(
        "text-xs leading-snug rounded-md p-3 bg-muted overflow-auto",
        className,
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
        className,
      )}
      {...props}
    />
  );
}
