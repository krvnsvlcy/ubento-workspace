import cn from "clsx";
import * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border placeholder:text-neutral-content-muted focus-visible:border-accent focus-visible:ring-accent/50 aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red dark:bg-neutral-surface/50/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
