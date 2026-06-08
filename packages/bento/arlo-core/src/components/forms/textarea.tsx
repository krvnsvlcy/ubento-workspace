import cn from "clsx";
import * as React from "react";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "border placeholder:text-content-muted focus-visible:border-border focus-visible:ring-accent/50 dark:bg-surface/50/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-main shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          hasError
            ? "border-border focus-visible:ring-destructive/20 aria-invalid:ring-destructive/20"
            : "aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
