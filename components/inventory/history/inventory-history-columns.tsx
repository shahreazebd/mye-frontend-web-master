"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { StockHistory } from "@/types/stock-history";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

export const columns: ColumnDef<StockHistory>[] = [
  {
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <div>{row?.index + 1}</div>,
  },
  {
    accessorKey: "local_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-sm font-normal">{row?.original?.local_sku}</p>
          <p className="mt-1 text-xs text-gray-400">
            {dayjs(row?.original?.created_at).format("DD-MM-YYYY hh:mma")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "stock_quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
  },

  {
    accessorKey: "stock_operation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Operation" />,
    cell: ({ row }) => <div>{row?.original?.stock_operation?.split("_")?.join(" ")}</div>,
  },
  {
    accessorKey: "current_stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
  },
  {
    accessorKey: "current_in_open",
    header: ({ column }) => <DataTableColumnHeader column={column} title="In Open" />,
  },

  {
    accessorKey: "available",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Available" />,
    cell: ({ row }) => {
      const current = row?.original?.current_stock - row?.original?.current_in_open;

      return <div>{current}</div>;
    },
  },
  {
    accessorKey: "updated_by",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated By" />,
    cell: ({ row }) => <Badge>{row?.original?.updated_by}</Badge>,
  },
];
