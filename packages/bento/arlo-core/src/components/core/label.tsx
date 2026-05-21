import * as LabelPrimitive from "@radix-ui/react-label";
import cn from "clsx";
import * as React from "react";

function Label({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { disabled?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        disabled && "text-neutral-content-muted",
        className,
      )}
      aria-disabled={disabled}
      {...props}
    />
  );
}

export { Label };
