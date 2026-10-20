"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { InventoryStockRequestData } from "@/types/inventory-stock-request";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import { DataTableRowActions } from "./table-row-actions";

export const columns: ColumnDef<InventoryStockRequestData>[] = [
  {
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <div>{row?.index + 1}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <div>{dayjs(row?.original?.created_at).format("MMM D, YYYY h:mm A")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => (
      <div className="w-12 text-center">{row?.original?.location?.name}</div>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Products" />
    ),
    cell: ({ row }) => (
      <div className="w-24 text-center">{row?.original?.data?.length}</div>
    ),
  },
  // {
  //   accessorKey: "sku",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
  //   cell: (info) =>
  //     info.row.original?.data?.map((e) => <div className="mb-1">{e?.sku}</div>),
  // },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Quantity" />
    ),
    cell: ({ row }) => {
      const sum = row?.original?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue?.product_quantity,
        0
      );

      return <div className="w-24 text-center">{sum}</div>;
    },
  },
  // {
  //   accessorKey: "quantity",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
  //   cell: (info) =>
  //     info.row.original?.data?.map((e) => (
  //       <div className="mb-1 w-14 text-center">{e?.product_quantity}</div>
  //     )),
  // },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    id: "view",
    cell: ({ row }) => <DataTableRowActions data={row.original} />,
  },
];
