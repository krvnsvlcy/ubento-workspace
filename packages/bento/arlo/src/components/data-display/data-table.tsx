"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@ubento/bento.arlo-core";
import { createComponent } from "@ubento/bento.core";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import * as React from "react";
import { z } from "zod";

// 1. Define action types for TypeScript to match our Zod schema
interface ActionProps {
  label: string;
  variant?: "primary" | "secondary" | "destructive";
  handler: () => void;
}

// 2. Extend DataTableProps to include the state properties defined in the Zod schema
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  isError?: boolean;
  errorMessage?: string;
  errorActions?: ActionProps[];
  emptyMessage?: string;
  emptyActions?: ActionProps[];
  padding?: number;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (args: {
    selectedRows: TData[];
    selectedRowIds: string[];
  }) => void;
  onRowClick?: (args: { row: TData; rowId: string }) => void;
  ref: React.ForwardedRef<HTMLDivElement>;
}

const DEFAULT_DATA: any[] = [];

function BaseDataTable<TData, TValue>({
  columns,
  data = DEFAULT_DATA as unknown as TData[],
  searchColumn,
  searchPlaceholder,
  isLoading,
  loadingMessage,
  isError,
  errorMessage,
  errorActions,
  emptyMessage,
  emptyActions,
  enableRowSelection = false,
  onRowSelectionChange,
  onRowClick,
  ref,
  padding = 0,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const resolvedColumns = React.useMemo(() => {
    if (enableRowSelection) {
      const selectionColumn: ColumnDef<TData, any> = {
        id: "select",
        header: ({ table }) => (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      };
      return [selectionColumn, ...columns];
    }
    return columns;
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((r) => r.original);
      const selectedRowIds = Object.keys(rowSelection).filter(
        (k) => rowSelection[k],
      );
      onRowSelectionChange({ selectedRows, selectedRowIds });
    }
  }, [rowSelection, table, onRowSelectionChange]);

  // Render Error State
  if (isError) {
    return (
      <div
        ref={ref}
        className="bg-neutral-surface border border-neutral-border rounded-xl flex flex-col items-center justify-center h-[400px] p-6 space-y-4 shadow-xs"
      >
        <p className="text-neutral-content-muted text-sm font-medium">
          {errorMessage || "Failed to load data."}
        </p>
        {errorActions && errorActions.length > 0 && (
          <div className="flex gap-3 mt-4">
            {errorActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.handler}
                variant={action.variant || "secondary"}
                size="md"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render Loading State
  if (isLoading) {
    return (
      <div
        ref={ref}
        className="bg-neutral-surface border border-neutral-border rounded-xl flex flex-col items-center justify-center h-[400px] gap-3 shadow-xs"
      >
        <Spinner className="size-6 text-accent" />
        <p className="text-neutral-content-muted font-medium text-sm animate-pulse">
          {loadingMessage || "Loading..."}
        </p>
      </div>
    );
  }

  // Render Empty State (initial data is empty)
  if (data.length === 0) {
    return (
      <div
        ref={ref}
        className="bg-neutral-surface border border-neutral-border rounded-xl flex flex-col items-center justify-center h-[400px] p-6 space-y-4 shadow-xs"
      >
        <p className="text-neutral-content-muted text-sm font-medium">
          {emptyMessage || "No results"}
        </p>
        {emptyActions && emptyActions.length > 0 && (
          <div className="flex gap-3 mt-4">
            {emptyActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.handler}
                variant={action.variant || "secondary"}
                size="md"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const rows = table.getRowModel().rows;
  const groups = table.getHeaderGroups();

  return (
    <div ref={ref} className="w-full space-y-4">
      {/* Top Bar for Search and Column Visibility */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {searchColumn ? (
          <Input
            placeholder={searchPlaceholder || "Search..."}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="w-full sm:max-w-md"
            size="md"
            prefix={<Search className="size-4" />}
          />
        ) : (
          <div />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="md"
              className="flex items-center gap-2 self-start sm:self-auto"
            >
              Columns <ChevronDown className="size-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-neutral-border">
        <TableRoot>
          <Table>
            <TableHead>
              {groups.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    return (
                      <TableHeaderCell
                        key={header.id}
                        className={
                          header.column.id === "select"
                            ? "w-12 px-0 text-center"
                            : undefined
                        }
                        style={{
                          paddingLeft:
                            i === 0 && header.column.id !== "select"
                              ? padding
                              : undefined,
                          paddingRight:
                            i === headerGroup.headers.length - 1
                              ? padding
                              : undefined,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHeaderCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={
                      onRowClick
                        ? "hover:bg-neutral-surface-hover/50 transition-colors cursor-pointer"
                        : "hover:bg-neutral-surface-hover/50 transition-colors"
                    }
                    onClick={() =>
                      onRowClick?.({ row: row.original, rowId: row.id })
                    }
                  >
                    {row.getVisibleCells().map((cell, i) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "select"
                            ? "w-12 px-0 text-center"
                            : undefined
                        }
                        style={{
                          paddingLeft:
                            i === 0 && cell.column.id !== "select"
                              ? padding
                              : undefined,
                          paddingRight:
                            i === row.getVisibleCells().length - 1
                              ? padding
                              : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={resolvedColumns.length}
                    className="h-24 text-center text-neutral-content-muted"
                  >
                    {emptyMessage || "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableRoot>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 py-1 text-sm">
        <div className="text-neutral-content-muted">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-neutral-content font-medium text-nowrap">
              Rows per page
            </span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top" className="min-w-[70px]">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-neutral-content font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="hidden h-8 w-8 p-0 sm:flex items-center justify-center"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 flex items-center justify-center"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 flex items-center justify-center"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden h-8 w-8 p-0 sm:flex items-center justify-center"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const actionProps = z.object({
  label: z.string(),
  variant: z.enum(["primary", "secondary", "destructive"]).default("primary"),
  handler: z.any(),
});

export const DataTable = createComponent({
  props: z.object({
    data: z.array(z.record(z.string(), z.any())),
    columns: z.array(z.any()), // TanStack ColumnDef is too complex for simple Zod
    // search
    searchColumn: z.string().optional(),
    searchPlaceholder: z.string().optional(),
    // selection
    enableRowSelection: z.boolean().default(false),
    // loading
    isLoading: z.boolean().default(false),
    loadingMessage: z.string().optional(),
    // error
    isError: z.boolean().default(false),
    errorMessage: z.string().optional(),
    errorActions: z.array(actionProps).optional(),
    // empty
    emptyMessage: z.string().optional(),
    emptyActions: z.array(actionProps).optional(),

    padding: z.number().default(0),
  }),

  events: z.object({
    rowSelectionChange: z.object({
      selectedRows: z.array(z.record(z.string(), z.any())),
      selectedRowIds: z.array(z.string()),
    }),
    rowClick: z.object({
      row: z.record(z.string(), z.any()),
      rowId: z.string(),
    }),
  }),

  summary: "A feature-rich data table with sorting, filtering, and pagination.",
  instructions: [
    "Use this component to display large sets of tabular data.",
    "The `columns` prop should follow the TanStack Table column definition schema.",
    "The `data` prop is an array of objects to display.",
    "The `searchColumn` enables a text search filter for a specific column.",
    "The `enableRowSelection` prop adds a checkbox column for selecting rows.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <BaseDataTable
        ref={ref}
        columns={props.columns}
        data={props.data}
        searchColumn={props.searchColumn}
        searchPlaceholder={props.searchPlaceholder}
        enableRowSelection={props.enableRowSelection}
        onRowSelectionChange={(args) => {
          emit("rowSelectionChange", args);
        }}
        onRowClick={(args) => {
          emit("rowClick", args);
        }}
        isLoading={props.isLoading}
        loadingMessage={props.loadingMessage}
        isError={props.isError}
        errorMessage={props.errorMessage}
        errorActions={props.errorActions}
        emptyMessage={props.emptyMessage}
        emptyActions={props.emptyActions}
        padding={props.padding}
      />
    );
  },
});
