import { Tone } from "@/tone";
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
        primary: "bg-base text-contrast hover:bg-hover",
        secondary: "bg-content/8 hover:bg-content/15",
        outline:
          "border border-tone-border bg-transparent hover:bg-tone-surface text-tone-content",
        ghost: "hover:bg-content/15 hover:text-content",
        link: "text-content/80 hover:text-content",
        "secondary-primary": "bg-content/8 hover:bg-content hover:text-content",
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
  tone?: Tone;
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
      tone,
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
        data-tone={tone}
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
