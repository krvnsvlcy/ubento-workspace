import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const Skeleton = createComponent({
  props: z.object({
    radius: z.number().optional(),
    className: z.string().optional(),
  }),

  summary: "A skeleton loader component.",
  instructions: [
    "Use this component to display a placeholder while content is loading.",
    "The `radius` prop controls the border radius.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <div
        ref={ref}
        className={cx(
          "animate-pulse rounded-md bg-neutral-border w-full h-4",
          props.className,
        )}
        style={{
          borderRadius:
            props.radius !== undefined ? `${props.radius}px` : undefined,
        }}
      />
    );
  },
});
