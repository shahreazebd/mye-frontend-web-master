"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<any>[] = [
  {
    id: "1",
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
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    accessorKey: "remote_product_id",
    header: "Remote Product ID",
  },
  {
    accessorKey: "remote_product_sku",
    header: "Remote Product SKU",
  },
  {
    accessorKey: "remote_product_title",
    header: "Remote Product Title",
    cell: ({ row }) => (
      <div className="2xl:max-w-[700px]">{row.original?.remote_product_title}</div>
    ),
  },
  {
    accessorKey: "fba_status",
    header: "FBA",
    cell: ({ row }) =>
      row.original.fba_status ? (
        <div className="w-8 text-center text-green-500">✓</div>
      ) : (
        <div className="w-8 text-center text-red-500">X</div>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div>{dayjs(row.original?.createdAt).format("YYYY-MM-DD")}</div>,
  },
];
