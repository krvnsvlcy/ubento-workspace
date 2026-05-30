import { Tone } from "@/tone";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

/* ---------- Heading ---------- */

const heading = cva("font-heading font-medium leading-tight tracking-tight", {
  variants: {
    level: {
      display: "text-5xl font-semibold tracking-tight",
      h1: "text-4xl font-semibold",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
    shade: {
      default: "text-content",
      subtle: "text-content-subtle",
      muted: "text-content-muted",
    },
  },
  defaultVariants: {
    level: "h1",
    shade: "default",
  },
});

export function Heading({
  level = "h1",
  shade,
  tone,
  className,
  ...props
}: Omit<React.ComponentProps<"h1">, "color"> &
  VariantProps<typeof heading> & {
    tone?: Tone;
  }) {
  const Tag = (level === "display" ? "h1" : (level || "h1")) as React.ElementType;

  return (
    <Tag
      className={cx(heading({ level, shade }), className)}
      {...props}
      data-tone={tone}
    />
  );
}

/* ---------- Overline ---------- */

const overline = cva("uppercase tracking-wide font-semibold", {
  variants: {
    size: {
      sm: "text-[10px] leading-none",
      md: "text-xs leading-none",
    },
    shade: {
      default: "text-current",
      subtle: "text-content-subtle",
      muted: "text-content-muted",
    },
  },
  defaultVariants: {
    size: "md",
    shade: "subtle",
  },
});

type OverlineProps = React.ComponentProps<"span"> &
  VariantProps<typeof overline> & {
    as?: React.ElementType;
    tone?: Tone;
  };

export function Overline({
  as: Tag = "span",
  size,
  shade,
  tone,
  className,
  ...props
}: OverlineProps) {
  return (
    <Tag
      className={cx(overline({ size, shade }), className)}
      {...props}
      data-tone={tone}
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
    shade: {
      default: "text-content",
      subtle: "text-content-subtle",
      muted: "text-content-muted",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    shade: "default",
  },
});

type TextProps = React.ComponentProps<"p"> &
  VariantProps<typeof text> & {
    as?: "p" | "span" | "div";
    tone?: Tone;
  };

export function Text({
  as: Tag = "p",
  size,
  weight,
  shade,
  tone,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cx(text({ size, weight, shade }), className)}
      {...props}
      data-tone={tone}
    />
  );
}

/* ---------- Code ---------- */

export function Code({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cx(
        "text-xs leading-snug rounded-lg p-3 bg-surface overflow-auto",
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
        "text-xs font-medium leading-snug rounded-md px-1 py-0.5 bg-content/7",
        className,
      )}
      {...props}
    />
  );
}
