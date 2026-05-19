import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

const actionRow = cva("flex flex-row items-center gap-2", {
    variants: {
        justify: {
            start: "justify-start",
            end: "justify-end",
        },
    },
    defaultVariants: {
        justify: "start",
    },
});

export type ActionRowProps =
    React.ComponentProps<"div"> &
    VariantProps<typeof actionRow>;

export function ActionRow({
    justify,
    className,
    ...props
}: ActionRowProps) {
    return <div className={cx(actionRow({ justify }), className)} {...props} />;
}
