import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import * as React from "react";
import { z } from "zod";
import {
  Table as CoreTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@ubento/bento.arlo-core";

export const Table = createComponent({
  props: z.object({
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
  }),

  summary: "A table component for displaying structured data.",
  instructions: [
    "Use this component to display tabular data.",
    "Pass `data` as an array of objects.",
    "Pass `columns` to define headers and keys. If omitted, keys are inferred from the first data item.",
    "The `stripe` prop enables zebra striping.",
    "The `hover` prop enables row highlighting on hover.",
    "The `compact` prop reduces padding.",
  ].join("\n"),

  render: ({ ref, props }) => {
    const { data = [], columns, stripe, hover, compact } = props;

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

    const paddingClass = compact ? "p-2 text-xs" : "p-4 text-sm";

    return (
      <TableRoot ref={ref}>
        <CoreTable>
          <TableHead>
            <TableRow>
              {resolvedColumns.map((col) => (
                <TableHeaderCell
                  key={col.key}
                  className={cx(paddingClass)}
                  style={{ width: col.width }}
                >
                  {col.header || col.key}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cx(
                  stripe && rowIndex % 2 === 1 && "bg-neutral-surface",
                  hover && "hover:bg-neutral-surface-hover",
                )}
              >
                {resolvedColumns.map((col) => (
                  <TableCell key={col.key} className={cx(paddingClass)}>
                    {String(row[col.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={resolvedColumns.length}
                  className="text-center p-8 text-neutral-content-muted"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </CoreTable>
      </TableRoot>
    );
  },
});
