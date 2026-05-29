import React from "react";

type TypographyVariant =
  | "d1"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-large"
  | "body"
  | "body-small"
  | "mono";

type TypographyShade = "default" | "subtle" | "muted" | "accent";

type TypographyWeight = "bold" | "medium" | "normal";

export function Typography({
  variant = "body",
  shade,
  weight,
  as,
  className = "",
  children,
  ...props
}: {
  variant?: TypographyVariant;
  shade?: TypographyShade;
  weight?: TypographyWeight;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<any>) {
  const variantClasses = {
    d1: "font-heading text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight",
    h1: "font-heading text-4xl sm:text-5xl tracking-tight leading-tight",
    h2: "font-heading text-3xl sm:text-4xl tracking-tight leading-tight",
    h3: "font-heading text-2xl sm:text-3xl tracking-tight leading-tight",
    h4: "font-heading text-xl sm:text-2xl tracking-tight leading-tight",
    "body-large": "text-lg sm:text-xl leading-relaxed",
    body: "text-base sm:text-lg leading-relaxed",
    "body-small": "text-sm leading-relaxed",
    mono: "text-[10px] tracking-widest uppercase font-mono",
  };

  const weightClasses = {
    bold: "font-bold",
    medium: "font-medium",
    normal: "font-normal",
  };

  const shadeClasses = {
    default: "text-neutral-content",
    subtle: "text-neutral-content-subtle",
    muted: "text-neutral-content-muted",
    accent: "text-accent",
  };

  const defaultElement: Record<TypographyVariant, React.ElementType> = {
    d1: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    "body-large": "p",
    body: "p",
    "body-small": "p",
    mono: "div",
  };

  const defaultShades: Record<TypographyVariant, TypographyShade> = {
    d1: "default",
    h1: "default",
    h2: "default",
    h3: "default",
    h4: "default",
    "body-large": "subtle",
    body: "subtle",
    "body-small": "subtle",
    mono: "muted",
  };

  const defaultWeights: Record<TypographyVariant, TypographyWeight> = {
    d1: "bold",
    h1: "bold",
    h2: "bold",
    h3: "bold",
    h4: "bold",
    "body-large": "normal",
    body: "normal",
    "body-small": "normal",
    mono: "bold",
  };

  const resolvedShade = shade || defaultShades[variant];
  const resolvedWeight = weight || defaultWeights[variant];
  const Component = as || defaultElement[variant];
  const classes =
    `${variantClasses[variant]} ${weightClasses[resolvedWeight]} ${shadeClasses[resolvedShade]} ${className}`.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
