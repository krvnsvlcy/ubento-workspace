import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export const inputContainerVariants = cva(
  // Shifted structural and background classes to the container.
  // Using focus-within to detect when the transparent input inside is focused.
  "flex items-center w-full text-sm transition-all focus-within:outline-none overflow-hidden aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-border focus-within:border-border-active bg-background",
        ghost: "hover:bg-current/5 focus-within:bg-current/5",
        error:
          "border border-border focus-within:ring-1 focus-within:ring-destructive",
      },
      size: {
        md: "h-8 px-3 rounded-xl gap-2",
        lg: "h-10 px-3 rounded-xl gap-2",
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
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputContainerVariants> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, size: inputSize, prefix, suffix, disabled, ...props },
    ref,
  ) => {
    return (
      <div
        className={inputContainerVariants({
          variant,
          size: inputSize,
          className,
        })}
        aria-disabled={disabled}
      >
        {prefix && (
          <div className="flex items-center text-content-muted shrink-0">
            {prefix}
          </div>
        )}

        <input
          className="flex w-full bg-transparent outline-none border-none p-0 m-0 placeholder:text-content-muted disabled:cursor-not-allowed text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
          ref={ref}
          disabled={disabled}
          {...props}
        />

        {suffix && (
          <div className="flex items-center text-content-muted shrink-0">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
