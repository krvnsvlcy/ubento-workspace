import cn from "clsx";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-neutral-surface/50 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
