import cn from "clsx";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-current/20 animate-pulse rounded-xl", className)}
      {...props}
    />
  );
}

export { Skeleton };
