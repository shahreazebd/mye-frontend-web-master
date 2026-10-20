"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useCompositeProductsAtom } from "@/atoms/productsAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { _set } from "@/utils/helpers";
import { rankItem, rankings } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditableCell from "@/components/order/legacy-open-orders/postage-preview/editable-cell";

import { DataTableLoading } from "../../data-table-loading";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

// import DataTableViewOptions from "./data-table-view-options";

interface DataTableProps<TData, TValue> {
  // eslint-disable-next-line no-unused-vars
  selectedRowData?: (data: TData[]) => void;
  // eslint-disable-next-line no-unused-vars
  onRowSelect?: React.Dispatch<React.SetStateAction<number[] | string[]>>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  title?: string;
  className?: string;
  description?: string;
  topClassName?: string;
  searchColumn?: string;
  tableRowClass?: string;
  searchPlaceholder?: string;
  card?: React.ReactNode;
  component?: React.ReactNode;
  header?: boolean;
  search?: boolean;
  loading?: boolean;
  pagination?: boolean;
  isViewShow?: boolean;
  tableHeader?: boolean;
  editableColumn?: boolean;
  singleRowSelection?: boolean;
  rowClickSelection?: boolean;
  paginationRowCountShow?: boolean;
  dataSize?: number;
  selectedDataCount?: number;
  pageOptions?: number[];
  query?: string;
  count?: number;
  noDataClassName?: string;
  errors?: any;
}

// // Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<any>> = {
  cell: (props) => <EditableCell {...props} />,
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value, {
    threshold: rankings.CONTAINS,
  });

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const emptyArray: [] = [];

interface TableRowComponentProps {
  row: Row<any>;
  isSelected: boolean;
  tableRowClass: string;
  pathname: string;
  errors: any;
  // eslint-disable-next-line no-unused-vars
  onRowClick: (row: Row<any>) => void;
}

const TableRowComponent = React.memo(
  ({
    row,
    isSelected,
    tableRowClass,
    pathname,
    errors,
    onRowClick,
  }: TableRowComponentProps) => {
    return (
      <TableRow
        className={cn(tableRowClass, "bg-white")}
        data-state={isSelected && "selected"}
        onClick={() => {
          if (pathname === "/order/open-orders/postage-preview") return;

          const rowErrors = errors?.[row.index];
          const hasError = rowErrors && Object.values(rowErrors).some(Boolean);

          if (hasError) return;

          onRowClick(row);
        }}
      >
        {row.getVisibleCells().map((cell) => {
          const { items, shipping_address } = cell?.row?.original || {};
          const isWarning = shipping_address === null || items?.length === 0;

          const rowIndex = row.index;
          const columnId = cell.column.id;
          const cellError = errors?.[rowIndex]?.[columnId];

          const hasTooltip = Boolean(cellError);
          const cellContent = (
            <div className="flex items-center gap-1">
              {cellError && (
                <AlertCircle size={14} className="mb-1 shrink-0 text-red-500" />
              )}

              {/* Cell value */}
              <span className={cn(cellError && "underline underline-offset-2")}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          );

          return (
            <TableCell
              key={cell.id}
              className={cn(
                isWarning && "bg-red-100",
                cellError && "text-red-500",
                "transition-colors"
              )}
            >
              {hasTooltip ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>{cellContent}</TooltipTrigger>

                    <TooltipContent
                      side="top"
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      {cellError}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                cellContent
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.tableRowClass === nextProps.tableRowClass &&
      prevProps.pathname === nextProps.pathname &&
      prevProps.errors === nextProps.errors &&
      prevProps.row.original === nextProps.row.original
    );
  }
);

TableRowComponent.displayName = "TableRowComponent";

export function DataTable<TData, TValue>({
  data,
  card,
  columns,
  component,
  title = "",
  className = "",
  description = "",
  topClassName = "",
  tableRowClass = "",
  header = true,
  search = true,
  loading = false,
  pagination = true,
  tableHeader = true,
  editableColumn = false,
  rowClickSelection = true,
  singleRowSelection = true,
  pageOptions,
  onRowSelect,
  dataSize = 10,
  selectedRowData,
  query,
  noDataClassName,
  errors,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [q, setQ] = React.useState<string | number>("");
  const searchParams = useSearchParams();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { setCompositeProductsState } = useCompositeProductsAtom();

  const pathname = usePathname();

  const table = useReactTable({
    data: data || emptyArray,
    columns,
    ...(editableColumn && {
      defaultColumn,
    }),

    meta: {
      updateData: (rowIndex: number, columnId: string, value: string, type: string) => {
        if (type === "composite") {
          setCompositeProductsState((prev) => ({
            ...prev,
            compositeProduct: prev?.compositeProduct.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...prev.compositeProduct[rowIndex],
                  ..._set(prev.compositeProduct[rowIndex], columnId, value),
                };
              }
              return row;
            }),
          }));
        } else {
          setOpenOrdersWithStorage((prev) => {
            const updatedOrders = prev?.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...prev[rowIndex],
                  ..._set(prev[rowIndex], columnId, value),
                };
              }
              return row;
            });

            return updatedOrders as MappedOpenOrder[];
          });
        }
      },
      errors,
    },

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },

    initialState: {
      pagination: {
        pageSize: dataSize,
        pageIndex: 0,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  React.useEffect(() => {
    table.resetRowSelection();
  }, [data?.length]);

  React.useEffect(() => {
    if (q) {
      table.resetPageIndex();
      setGlobalFilter(String(q));
    } else {
      setGlobalFilter("");
    }
  }, [q]);

  React.useEffect(() => {
    if (query) {
      table.resetPageIndex();
      setGlobalFilter(String(query));
    } else {
      setGlobalFilter("");
    }
  }, [query]);

  React.useEffect(() => {
    if (onRowSelect) {
      const data = table
        .getFilteredSelectedRowModel()
        .flatRows.map((row) => JSON.stringify(row.original));
      const selectedId = data.map((row) => JSON.parse(row).id);
      onRowSelect(() => selectedId);
    }
  }, [onRowSelect, rowSelection, table]);

  React.useEffect(() => {
    const data = table.getSelectedRowModel().rows.map((row) => row.original);

    selectedRowData?.(data);
  }, [rowSelection]);

  React.useEffect(() => {
    table.resetPageIndex();
  }, [searchParams]);

  if (!table) return null;

  const handelRowSelect = (row: Row<any>) => {
    if (singleRowSelection) {
      table.resetRowSelection();
    }
    if (rowClickSelection) {
      row.toggleSelected();
    }
  };

  return (
    <div className={topClassName || `space-y-4 overflow-hidden`}>
      {header && (
        <DataTableToolbar
          title={title}
          description={description}
          component={component}
          search={search}
          card={card}
          q={q}
          setQ={setQ}
        />
      )}
      {loading ? (
        <DataTableLoading columnCount={table.getAllColumns().length} rowCount={10} />
      ) : (
        <>
          <div className={`${className}`}>
            <Table className="relative">
              {tableHeader && (
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="sticky top-0 z-[1] bg-white"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
              )}

              <TableBody
                className={`${tableRowClass ? "[&_tr:last-child]:border" : ""} `}
              >
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRowComponent
                        key={row.id}
                        row={row}
                        isSelected={row.getIsSelected()}
                        tableRowClass={tableRowClass}
                        pathname={pathname}
                        errors={errors}
                        onRowClick={handelRowSelect}
                      />
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <div
                        className={cn(
                          "mx-auto flex h-[calc(100vh-250px)] flex-col items-center justify-center",
                          noDataClassName
                        )}
                      >
                        <Image
                          src="/images/no-data.png"
                          alt="no-data"
                          width={150}
                          height={150}
                        />
                        <p className="mt-1 text-sm text-[#8ba7b2]">No data!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {pagination && <DataTablePagination table={table} pageOptions={pageOptions} />}
        </>
      )}
    </div>
  );
}
