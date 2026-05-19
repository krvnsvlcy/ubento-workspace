import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "clsx";
import * as React from "react";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-neutral-surface/80 hover:text-neutral-content-muted disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-surface/50 data-[state=on]:text-neutral-content [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border bg-transparent shadow-xs hover:bg-neutral-surface/50 hover:text-neutral-content",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
