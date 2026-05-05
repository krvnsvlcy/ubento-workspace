import { cx } from "class-variance-authority";

export function Content({ children, className, ...props }: { children: React.ReactNode } & React.ComponentProps<"div">) {
    return <div className={cx("flex flex-col h-full w-full", className)} {...props}>{children}</div>;
}

export function ContentBody({ children, className, ...props }: { children: React.ReactNode } & React.ComponentProps<"div">) {
    return <div className={cx("grow py-5 px-6 space-y-8", className)} {...props}>{children}</div>;
}

export function ContentFooter({ children, className, ...props }: { children: React.ReactNode } & React.ComponentProps<"div">) {
    return <div className={cx("shrink-0 py-5 px-6 space-y-2", className)} {...props}>{children}</div>;
}

export function ContentHeader({ children, className, ...props }: { children: React.ReactNode } & React.ComponentProps<"div">) {
    return <div className={cx("shrink-0 py-5 px-6 space-y-2", className)} {...props}>{children}</div>;
}
