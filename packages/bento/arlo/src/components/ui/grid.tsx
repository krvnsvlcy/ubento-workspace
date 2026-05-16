import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";

export const Grid = createComponent({
  props: z.object({
    columns: z.number().optional(),
    rows: z.number().optional(),
    gap: z.number().optional(),
    className: z.string().optional(),
  }),

  summary: "A grid layout component.",
  instructions: [
    "Use this component to create a grid layout.",
    "The `columns` prop controls the number of columns.",
    "The `rows` prop controls the number of rows.",
    "The `gap` prop controls the gap between items.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    return (
      <div
        ref={ref}
        className={cx("grid", props.className)}
        style={{
          gridTemplateColumns: props.columns
            ? `repeat(${props.columns}, minmax(0, 1fr))`
            : undefined,
          gridTemplateRows: props.rows
            ? `repeat(${props.rows}, minmax(0, 1fr))`
            : undefined,
          gap: props.gap ? `${props.gap}px` : undefined,
        }}
      >
        {children}
      </div>
    );
  },
});
