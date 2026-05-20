// Tremor Textarea [v1.0.0]

import React from "react";

import { cx, focusInput, hasErrorInput } from "@/lib/utils.js";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }: TextareaProps, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        className={cx(
          // base
          "flex min-h-[4rem] w-full rounded-md border px-3 py-1.5 shadow-xs outline-hidden transition-colors sm:text-sm",
          // text color
          "text-neutral-content",
          // border color
          "border-neutral-border",
          // background color
          "bg-neutral-surface",
          // placeholder color
          "placeholder-neutral-content-muted",
          // disabled
          "disabled:bg-neutral-surface disabled:text-neutral-content-muted",
          // focus
          focusInput,
          // error
          hasError ? hasErrorInput : "",
          // invalid (optional)
          // "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          className,
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
