import { cva, cx, VariantProps } from "class-variance-authority";

export function RailLayout({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex h-full w-full" {...props}>
      {children}
    </div>
  );
}

const railLayoutSideVariants = cva("shrink-0 w-[240px] h-full", {
  variants: {
    variant: {
      default: "bg-surface/70",
    },
    side: {
      left: "border-r",
      right: "border-l",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export function RailLayoutSide({
  children,
  className,
  variant,
  side,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof railLayoutSideVariants>) {
  return (
    <div
      className={cx(railLayoutSideVariants({ variant, side }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

const railLayoutMainVariants = cva("grow h-full", {
  variants: {},
});
export function RailLayoutMain({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof railLayoutMainVariants>) {
  return (
    <div className={cx(railLayoutMainVariants({}), className)} {...props}>
      {children}
    </div>
  );
}
