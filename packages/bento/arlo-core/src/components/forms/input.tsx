import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";

export const inputVariants = cva(
  "flex w-full border bg-neutral-surface text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-content-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-border focus:border-neutral-border-active outline-none",
        error: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        md: "h-8 px-3 rounded-xl",
        lg: "h-10 px-3 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size: inputSize, ...props }, ref) => {
    return (
      <input
        className={inputVariants({ variant, size: inputSize, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
