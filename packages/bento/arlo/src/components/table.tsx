import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  getLayoutElementStyle,
  layoutElementStyleSchema,
  useLayoutContext,
  type LayoutContextType,
} from "../lib/style";

export const tablePropsSchema = layoutElementStyleSchema.extend({
  data: z.array(z.record(z.string(), z.any())).optional(),
  columns: z
    .array(
      z.object({
        key: z.string(),
        header: z.string().optional(),
        width: z.string().optional(),
      }),
    )
    .optional(),
  stripe: z.boolean().optional(),
  hover: z.boolean().optional(),
  compact: z.boolean().optional(),
});

export type TableProps = z.infer<typeof tablePropsSchema>;

function getTableStyle(
  props: TableProps,
  layoutContext: LayoutContextType,
): React.CSSProperties {
  return {
    ...getLayoutElementStyle(props, layoutContext),
    width: "100%",
    borderCollapse: "collapse",
    fontSize: props.compact ? "13px" : "14px",
    fontFamily: "var(--font-family, sans-serif)",
    color: "var(--color-neutral-content)",
    textAlign: "left",
  };
}

export const Table = createComponent({
  props: tablePropsSchema,
  summary: "Table component for displaying structured data",
  instruction: [
    "The component accepts `data` as an array of objects to display in the table.",
    "If `columns` are not provided, they will be automatically inferred from the keys of the first item in the `data` array.",
    "You can explicitly define `columns` to control which fields are shown, their header labels, and column widths.",
    "Use `stripe` to enable zebra striping and `hover` to highlight rows on hover.",
  ].join("\n"),
  render: ({ ref, props, emit }) => {
    const layoutContext = useLayoutContext();
    const { data = [], columns, stripe, hover, compact } = props;

    // Infer columns if not provided
    const resolvedColumns = React.useMemo(() => {
      if (columns && columns.length > 0) {
        return columns;
      }
      if (data.length > 0) {
        return Object.keys(data[0]).map((key) => ({
          key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
          width: undefined,
        }));
      }
      return [];
    }, [data, columns]);

    const padding = compact ? "8px 12px" : "12px 16px";

    return (
      <div
        style={{
          overflowX: "auto",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid var(--color-neutral-border)",
          background: "var(--color-background)",
        }}
      >
        <table ref={ref} style={getTableStyle(props, layoutContext)}>
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--color-neutral-border)",
                background: "var(--color-neutral-surface)",
              }}
            >
              {resolvedColumns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding,
                    fontWeight: 600,
                    color: "var(--color-neutral-content-strong)",
                    width: col.width,
                  }}
                >
                  {col.header || col.key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  borderBottom: "1px solid var(--color-neutral-border-subtle)",
                  backgroundColor:
                    stripe && rowIndex % 2 === 1
                      ? "var(--color-neutral-surface-subtle)"
                      : "transparent",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (hover) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-neutral-surface-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (hover) {
                    e.currentTarget.style.backgroundColor =
                      stripe && rowIndex % 2 === 1
                        ? "var(--color-neutral-surface-subtle)"
                        : "transparent";
                  }
                }}
                onClick={() => {
                  emit("rowClick", { data: row });
                }}
              >
                {resolvedColumns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding,
                      color: "var(--color-neutral-content)",
                    }}
                  >
                    {String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={resolvedColumns.length}
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    color: "var(--color-neutral-content-dimmed)",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  },
});
