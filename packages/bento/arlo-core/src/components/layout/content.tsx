import { cx } from "class-variance-authority";

export function Content({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div className={cx("flex flex-col h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function ContentBody({
  children,
  className,
  paddingX = true,
  paddingY = true,
  ...props
}: {
  children?: React.ReactNode;
  paddingX?: boolean;
  paddingY?: boolean;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cx(
        "grow space-y-8",
        { "py-5": paddingY, "px-6": paddingX },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContentFooter({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div className={cx("shrink-0 py-5 px-6 space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

export function ContentHeader({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div className={cx("shrink-0 py-5 px-6 space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
