import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { DataTable as CoreDataTable } from "../../core/ui/data-table.js";
import * as React from "react";

export const DataTable = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    columns: z.array(z.any()), // TanStack ColumnDef is too complex for simple Zod
    searchColumn: z.string().optional(),
    searchPlaceholder: z.string().default("Search..."),
  }),

  summary: "A feature-rich data table with sorting, filtering, and pagination.",
  instructions: [
    "Use this component to display large sets of tabular data.",
    "The `columns` prop should follow the TanStack Table column definition schema.",
    "The `data` prop is an array of objects to display.",
    "The `searchColumn` enables a text search filter for a specific column.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <CoreDataTable
        ref={ref}
        columns={props.columns}
        data={props.data}
        searchColumn={props.searchColumn}
        searchPlaceholder={props.searchPlaceholder}
      />
    );
  },
});
