import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import {
  getResizableElementStyle,
  LayoutContext,
  resizableElementStyleSchema,
  useLayoutContext,
} from "../../lib/style/style.js";

export const gridPropsSchema = resizableElementStyleSchema.extend({
  columns: z.number().optional(),
  rows: z.number().optional(),
  gap: z.number().optional(),
  className: z.string().optional(),
});

export const Grid = createComponent({
  props: gridPropsSchema,

  summary: "A grid layout component.",
  instructions: [
    "Use this component to create a grid layout.",
    "The `columns` prop controls the number of columns.",
    "The `rows` prop controls the number of rows.",
    "The `gap` prop controls the gap between items.",
  ].join("\n"),

  render: ({ ref, props, children }) => {
    const parentLayoutContext = useLayoutContext();
    return (
      <div
        ref={ref}
        className={cx("grid", props.className)}
        style={{
          ...getResizableElementStyle(props, parentLayoutContext),
          gridTemplateColumns: props.columns
            ? `repeat(${props.columns}, minmax(0, 1fr))`
            : undefined,
          gridTemplateRows: props.rows
            ? `repeat(${props.rows}, minmax(0, 1fr))`
            : undefined,
          gap: props.gap ? `${props.gap}px` : undefined,
        }}
      >
        <LayoutContext.Provider value="grid">
          {children}
        </LayoutContext.Provider>
      </div>
    );
  },
});
