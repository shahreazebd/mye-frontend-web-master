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

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditableCell from "@/components/order/open-orders/postage-preview/editable-cell";

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
  paginationRowCountShow,
  query,
  count,
  noDataClassName,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [q, setQ] = React.useState<string | number>("");
  const searchParams = useSearchParams();

  const { setOpenOrdersWithStorage, openOrdersWithStorage } =
    useOpenOrderAtomWithStorage();
  // const { setPostageInfo } = usePostageAtom();

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
    const data = table.getFilteredSelectedRowModel().rows.map((row) => row.original);

    selectedRowData?.(data);
  }, [
    table.getFilteredSelectedRowModel().rows.length,
    table.getFilteredSelectedRowModel().rows[0]?.index,
    openOrdersWithStorage,
  ]);

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
    <div className={topClassName ? topClassName : `space-y-4 overflow-hidden`}>
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
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className={cn(tableRowClass, "bg-white")}
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {
                        if (pathname !== "/order/open-orders/postage-preview") {
                          handelRowSelect(row);
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const { items, shipping_address } = cell?.row?.original || {};
                        const isWarning =
                          shipping_address === null || items?.length === 0;

                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(isWarning && "bg-red-100")}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
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
          {pagination && (
            <DataTablePagination
              // paginationRowCountShow={paginationRowCountShow}
              table={table}
              pageOptions={pageOptions}
              // count={count}
            />
          )}
        </>
      )}
    </div>
  );
}
