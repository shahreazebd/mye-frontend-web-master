"use client";

import * as React from "react";
import Image from "next/image";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useCompositeProductsAtom } from "@/atoms/productsAtom";
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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditableCell from "@/components/order/legacy-open-orders/postage-preview/editable-cell";

import { DataTableLoading } from "../../data-table-loading";

interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

interface DataTableProps<TData, TValue> {
  selectedRowData?: (data: TData[]) => void;
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
  header?: boolean;
  search?: boolean;
  loading?: boolean;
  loadingRowCount?: number;
  isViewShow?: boolean;
  tableHeader?: boolean;
  editableColumn?: boolean;
  singleRowSelection?: boolean;
  rowClickSelection?: boolean;
  paginationRowCountShow?: boolean;
  dataSize?: number;
  selectedDataCount?: number;
  pageOptions?: number[];
  pagination: PaginationType;
  setPagination: any;
  count?: number;
}

// Default editable column
const defaultColumn: Partial<ColumnDef<any>> = {
  cell: (props) => <EditableCell {...props} />,
};

// Fuzzy filter
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value, {
    threshold: rankings.CONTAINS,
  });
  addMeta({ itemRank });
  return itemRank.passed;
};

const emptyArray: [] = [];

export function DataTableVirtualized2<TData, TValue>({
  data,
  columns,
  className = "",
  topClassName = "",
  tableRowClass = "",
  loading = false,
  loadingRowCount = 10,
  tableHeader = true,
  editableColumn = false,
  rowClickSelection = true,
  singleRowSelection = true,
  pageOptions = [10, 20, 30, 40, 50],
  onRowSelect,
  selectedRowData,
  count,
  pagination,
  setPagination,
  paginationRowCountShow = true,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const { setCompositeProductsState } = useCompositeProductsAtom();

  const paginationMemo = React.useMemo(
    () => ({
      pageIndex: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
    }),
    [pagination.pageIndex, pagination.pageSize]
  );

  React.useEffect(() => {
    setPagination((prev: PaginationType) => ({
      ...prev,
      pageSize: pageOptions[0],
      pageIndex: 0,
    }));
  }, []);

  let totalPage: any;
  if (count) totalPage = Math.ceil(count / pagination.pageSize);

  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    ...(editableColumn && { defaultColumn }),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string, type: string) => {
        if (type === "composite") {
          setCompositeProductsState((prev) => ({
            ...prev,
            compositeProduct: prev?.compositeProduct.map((row, index) =>
              index === rowIndex
                ? {
                    ...prev.compositeProduct[rowIndex],
                    ..._set(prev.compositeProduct[rowIndex], columnId, value),
                  }
                : row
            ),
          }));
        } else {
          setOpenOrdersWithStorage((prev) =>
            prev?.map((row, index) =>
              index === rowIndex
                ? { ...prev[rowIndex], ..._set(prev[rowIndex], columnId, value) }
                : row
            )
          );
        }
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination: paginationMemo,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
    filterFns: { fuzzy: fuzzyFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    pageCount: totalPage ?? -1,
    onPaginationChange: setPagination,
    manualPagination: true,
    defaultColumn: {
      size: 150,
      minSize: 80,
      maxSize: 400,
    },
  });

  const rows = table.getRowModel().rows;

  // Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  React.useEffect(() => table.resetRowSelection(), [data?.length, loading]);

  React.useEffect(() => {
    if (onRowSelect) {
      const selectedIds = table
        .getFilteredSelectedRowModel()
        .flatRows.map((r) => r.original.id);
      onRowSelect(() => selectedIds);
    }
  }, [onRowSelect, rowSelection]);

  React.useEffect(() => {
    selectedRowData?.(table.getFilteredSelectedRowModel().rows.map((r) => r.original));
  }, [
    table.getFilteredSelectedRowModel().rows.length,
    table.getFilteredSelectedRowModel().rows[0]?.index,
  ]);

  if (!table) return null;
  if (loading)
    return (
      <DataTableLoading
        columnCount={table.getAllColumns().length}
        rowCount={loadingRowCount}
      />
    );

  const handelRowSelect = (row: Row<any>) => {
    // if (singleRowSelection) table.resetRowSelection();
    if (rowClickSelection) row.toggleSelected();
  };

  return (
    <div className={topClassName ? topClassName : `space-y-4 py-3`}>
      <div
        ref={containerRef}
        className={cn(
          "max-h-[calc(100vh-200px)] overflow-auto rounded-md border",
          className
        )}
      >
        <table className="relative w-full table-fixed border-collapse">
          {/* ===== Header ===== */}
          {tableHeader && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const size = header.getSize();
                    return (
                      <TableHead
                        key={header.id}
                        className="sticky top-0 z-[1] bg-white"
                        style={{
                          width: size,
                          minWidth: size,
                          maxWidth: size,
                        }}
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

          {/* ===== Body ===== */}
          <TableBody
            style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              const status = row.original?.in_open > row.original?.stock_level;

              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    tableRowClass,
                    "absolute flex w-full items-center border-b border-border",
                    row.getIsSelected() && "bg-muted/50"
                  )}
                  style={{
                    top: virtualRow.start,
                    height: virtualRow.size,
                  }}
                  onClick={() => handelRowSelect(row)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const size = cell.column.getSize();
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: size,
                          minWidth: size,
                          maxWidth: size,
                        }}
                        className={cn(status && "bg-pink-200")}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            {!rows.length && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="mx-auto flex h-[calc(100vh-250px)] flex-col items-center justify-center">
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
        </table>
      </div>

      {/* ===== Pagination ===== */}
      <div className="relative flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {paginationRowCountShow
            ? `${table.getFilteredSelectedRowModel().rows.length} of ${
                table.getFilteredRowModel().rows.length
              } row(s) selected.`
            : ""}
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                setPagination((prev: PaginationType) => ({
                  ...prev,
                  pageSize: Number(value),
                }));
              }}
            >
              <SelectTrigger className="h-8 w-[70px] bg-white">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent className="top-3" side="top">
                {pageOptions?.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[110px] items-center justify-center text-sm font-medium">
            {count
              ? `Page ${pagination.pageIndex + 1} of ${totalPage}`
              : `Page ${table.getState().pagination.pageIndex + 1} of ${Math.max(
                  1,
                  table.getPageCount()
                )}`}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden size-8 bg-white p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 bg-white p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 bg-white p-0"
              onClick={() => table.nextPage()}
              disabled={
                !table.getCanNextPage() ||
                table.getState().pagination.pageIndex + 1 ===
                  Math.max(1, table.getPageCount())
              }
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 bg-white p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={
                !table.getCanNextPage() ||
                table.getState().pagination.pageIndex + 1 ===
                  Math.max(1, table.getPageCount())
              }
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
