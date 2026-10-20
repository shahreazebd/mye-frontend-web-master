"use client";

import { Data } from "@/schema/product";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";

export let columns: ColumnDef<Data>[] = [
  {
    id: "aa",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="ml-3">{row.index + 1}</div>,
  },

  {
    accessorKey: "remote_product_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product ID" />,
    cell: ({ row }) => <div>{row.getValue("remote_product_id")}</div>,
  },

  {
    accessorKey: "remote_product_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product SKU" />,
    cell: ({ row }) => <div>{row.getValue("remote_product_sku")}</div>,
  },

  {
    accessorKey: "remote_product_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("remote_product_sku")}</div>,
  },

  {
    accessorKey: "remote_product_title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <div>{row.getValue("remote_product_title")}</div>,
  },

  {
    accessorKey: "fba_status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FBA Status" />,
    cell: ({ row }) => <div>{row.getValue("fba_status")}</div>,
  },
];
