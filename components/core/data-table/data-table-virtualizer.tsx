"use client";

import * as React from "react";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useCompositeProductsAtom } from "@/atoms/productsAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { _set } from "@/utils/helpers";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
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
import EditableCell from "@/components/order/open-orders/postage-preview/editable-cell";

type DataTableVirtualizedProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  title?: string;
  pagination?: boolean;
  singleRowSelection?: boolean;
  editableColumn?: boolean;
  component?: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  selectedRowData?: (rows: TData[]) => void;
  errors?: any;
};

const defaultColumn: Partial<ColumnDef<any>> = {
  cell: (props) => <EditableCell {...props} />,
};

/**
 * ✅ Virtualized DataTable (drop-in replacement for existing DataTable)
 * Supports: selection, virtualization, controlled props.
 */
export function DataTableVirtualized<TData>({
  data,
  columns,
  title,
  // pagination = false,
  // singleRowSelection = false,
  editableColumn = false,
  component,
  errors,
  selectedRowData,
}: DataTableVirtualizedProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { setCompositeProductsState } = useCompositeProductsAtom();

  const table = useReactTable({
    data,
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
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  // Virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  React.useEffect(() => {
    const selected = table.getFilteredSelectedRowModel().rows.map((r) => r.original);
    selectedRowData?.(selected);
  }, [rowSelection]);

  return (
    <div className="space-y-3">
      {title ? (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          {component}
        </div>
      ) : (
        component
      )}

      <div
        ref={containerRef}
        className="relative max-h-[calc(100vh-200px)] overflow-auto rounded-md border border-border"
      >
        <Table>
          <TableHeader className="sticky top-0 z-[1] bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {paddingTop > 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ height: `${paddingTop}px` }}
                />
              </TableRow>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow
                  className={cn("bg-white")}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const { items, shipping_address } = cell?.row?.original || {};
                    const isWarning = shipping_address === null || items?.length === 0;

                    const rowIndex = row.index;
                    const columnId = cell.column.id;
                    const cellError = errors?.[rowIndex]?.[columnId];

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          isWarning && "bg-red-100",
                          cellError && "text-red-500",
                          "transition-colors"
                        )}
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1">
                                {cellError && (
                                  <AlertCircle
                                    size={14}
                                    className="mb-1 shrink-0 text-red-500"
                                  />
                                )}

                                {/* Cell value */}
                                <span
                                  className={cn(
                                    cellError && "underline underline-offset-2"
                                  )}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </span>
                              </div>
                            </TooltipTrigger>

                            {cellError && (
                              <TooltipContent
                                side="top"
                                className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                              >
                                {cellError}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {paddingBottom > 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ height: `${paddingBottom}px` }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
