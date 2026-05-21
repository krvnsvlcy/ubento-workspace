import * as SwitchPrimitive from "@radix-ui/react-switch";
import cn from "clsx";
import * as React from "react";

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "default" | "small";
}

function Switch({
  className,
  size = "default",
  ...props
}: SwitchProps) {
  const rootSizeClass = size === "small" ? "h-4 w-7" : "h-[1.15rem] w-8";
  const thumbSizeClass = size === "small" ? "size-3 data-[state=checked]:translate-x-3" : "size-4 data-[state=checked]:translate-x-[calc(100%-2px)]";

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-accent data-[state=unchecked]:bg-fg/20 focus-visible:border-accent focus-visible:ring-accent/50 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        rootSizeClass,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-neutral-surface pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0",
          thumbSizeClass,
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
