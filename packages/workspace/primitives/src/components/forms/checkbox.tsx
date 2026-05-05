import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import cn from "clsx";
import { CheckIcon } from "lucide-react";
import * as React from "react";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border dark:bg-neutral-surface/50/30 data-[state=checked]:bg-accent data-[state=checked]:text-accent-ctr dark:data-[state=checked]:bg-accent data-[state=checked]:border-accent focus-visible:border-accent focus-visible:ring-accent/50 aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
