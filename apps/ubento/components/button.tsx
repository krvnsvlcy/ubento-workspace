import React from "react";

export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: {
  variant?: "primary" | "secondary" | "link" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"button">, "variant" | "size"> &
  Omit<React.ComponentPropsWithoutRef<"a">, "variant" | "size">) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all select-none cursor-pointer rounded-full outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-base text-contrast hover:bg-hover active:bg-active",
    secondary:
      "bg-content text-surface hover:scale-[1.01] active:scale-[0.99]",
    link: "text-base hover:underline font-mono bg-transparent hover:scale-100",
    outline:
      "border border-border bg-transparent text-content hover:bg-border/20 hover:scale-[1.01] active:scale-[0.99]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "h-12 px-8 text-sm",
    lg: "px-8 py-4 text-base hover:scale-[1.02] active:scale-[0.98]",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
