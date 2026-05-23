import { Intent } from "@/intent";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "clsx";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap rounded-xl",
  {
    variants: {
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      variant: {
        primary: "bg-intent text-intent-contrast hover:bg-intent-hover",
        secondary:
          "bg-intent-content/5 text-intent-content hover:bg-intent-content/10",
        outline:
          "border border-intent-border bg-transparent hover:bg-intent-surface text-intent-content",
        ghost:
          "text-intent-content hover:bg-intent-content/10 hover:text-intent-content",
        link: "text-intent-content-subtle hover:text-intent-content",

        "secondary-destructive":
          "bg-intent-content/5 text-intent-content hover:bg-destructive hover:text-destructive-contrast",
        destructive:
          "text-destructive-contrast border-transparent bg-destructive hover:bg-destructive-hover disabled:bg-destructive-surface disabled:text-destructive-content-muted",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
        icon: "h-8 w-8 p-0",
        "icon-sm": "size-10",
        "icon-lg": "size-6",
      },
      shape: {
        rounded: "rounded-xl",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
      // variant + size
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
          "destructive",
        ],
        size: "sm",
        class: "h-6 px-2 text-xs",
      },
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
          "destructive",
        ],
        size: "md",
        class: "h-8 px-4",
      },
      {
        variant: [
          "primary",
          "secondary",
          "secondary-destructive",
          "outline",
          "ghost",
          "destructive",
        ],
        size: "lg",
        class: "h-10 px-4",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "md",
      shape: "rounded",
      align: "center",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  intent?: Intent;
  isLoading?: boolean;
  loadingText?: string;
}

export let Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      align,
      intent,
      asChild = false,
      isLoading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, shape, align, className }),
        )}
        ref={ref as any}
        data-intent={intent}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <Loader2
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);
Button.displayName = "Button";
export { buttonVariants };
