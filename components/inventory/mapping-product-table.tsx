import React from "react";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { InventoryRequestHistoryData } from "@/types/inventory-request-history";
import { MappingProduct } from "@/types/mapping-product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableProps<TData> = {
  data: TData[] | undefined;
  columns: ColumnDef<TData>[];
  // eslint-disable-next-line no-unused-vars
  renderSubComponent: (props: {
    subComponentData: InventoryRequestHistoryData[];
    subComponentLoading: boolean;
  }) => React.ReactElement;
  // eslint-disable-next-line no-unused-vars
  getRowCanExpand: (row: Row<TData>) => boolean;
  subComponentData: InventoryRequestHistoryData[];
  subComponentLoading: boolean;
};

const emptyArray: [] = [];

export function MappingProductTable({
  data,
  columns,
  renderSubComponent,
  getRowCanExpand,
  subComponentData,
  subComponentLoading,
}: TableProps<MappingProduct>) {
  const table = useReactTable<MappingProduct>({
    data: data || emptyArray,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => {
                  return (
                    <TableHead key={header?.id} colSpan={header?.colSpan}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel()?.rows?.map((row) => {
                return (
                  <>
                    <TableRow
                      key={row?.id}
                      data-state={row?.getIsSelected() && "selected"}
                    >
                      {row?.getVisibleCells()?.map((cell) => (
                        <TableCell key={cell?.id}>
                          {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row?.getIsExpanded() && (
                      <TableRow>
                        {/* 2nd row is a custom 1 cell row */}
                        <TableCell colSpan={row?.getVisibleCells()?.length}>
                          {renderSubComponent({
                            subComponentData,
                            subComponentLoading,
                          })}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
