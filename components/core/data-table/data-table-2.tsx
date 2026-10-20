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
  //   PaginationState,
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

// Give our default column cell renderer editing superpowers!
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

export function DataTable2<TData, TValue>({
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

  const paginationMemo = React.useMemo(
    () => ({
      pageIndex: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
    }),
    [pagination.pageIndex, pagination.pageSize]
  );

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { setCompositeProductsState } = useCompositeProductsAtom();

  React.useEffect(() => {
    setPagination((prev: PaginationType) => {
      return {
        ...prev,
        pageSize: pageOptions[0],
        pageIndex: 0,
      };
    });
  }, []);

  let totalPage: any;
  if (count) {
    totalPage = Math.ceil(count / pagination.pageSize);
  }

  const table = useReactTable({
    data: data ?? emptyArray,
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
            return prev?.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...prev[rowIndex],
                  ..._set(prev[rowIndex], columnId, value),
                };
              }
              return row;
            });
          });
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
    // getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    pageCount: totalPage ?? -1,
    onPaginationChange: setPagination,
    // getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
  });

  React.useEffect(() => {
    table.resetRowSelection();
  }, [data?.length, loading]);

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
    const data = table.getFilteredSelectedRowModel().rows.map((row) => row.original);

    selectedRowData?.(data);
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
    if (singleRowSelection) {
      table.resetRowSelection();
    }
    if (rowClickSelection) {
      row.toggleSelected();
    }
  };

  return (
    <div className={topClassName ? topClassName : `space-y-4 py-3`}>
      <div className={`overflow-hidden rounded-md border ${className}`}>
        <Table className="relative">
          {tableHeader && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="sticky top-0 z-[1] bg-white">
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

          <TableBody className={`${tableRowClass ? "[&_tr:last-child]:border" : ""} `}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn(tableRowClass, "bg-white")}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handelRowSelect(row)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const status =
                      cell.row.original?.in_open > cell.row.original?.stock_level;

                    return (
                      <TableCell key={cell.id} className={cn(status && "bg-pink-200")}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
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
        </Table>
      </div>

      <div className="relative flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {paginationRowCountShow ? (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                setPagination((prev: PaginationType) => {
                  return {
                    ...prev,
                    pageSize: Number(value),
                  };
                });
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
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 bg-white p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
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
              <span className="sr-only">Go to next page</span>
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
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
