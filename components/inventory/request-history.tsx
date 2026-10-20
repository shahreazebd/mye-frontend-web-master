import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { InventoryRequestHistoryData } from "@/types/inventory-request-history";

import { DataTable } from "../core/data-table/data-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Badge } from "../ui/badge";

const columns: ColumnDef<InventoryRequestHistoryData>[] = [
  {
    accessorKey: "item_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row?.index + 1}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "request_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Request ID" />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <div className="w-14 text-center">{row?.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
    cell: ({ row }) => <>{dayjs(row?.getValue("updated_at")).format("DD-MM-YYYY")}</>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge>{row?.getValue("status")}</Badge>,
  },
  {
    id: "stock_operation",
    accessorKey: "request_metadata.stock_operation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Operation" />,
    cell: ({ row }) => (
      <div>{row?.original?.request_metadata?.stock_operation?.split("_")?.join(" ")}</div>
    ),
  },
  {
    id: "invoked_by",
    accessorKey: "request_metadata.invoked_by",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action By" />,
    cell: ({ row }) => <div>{row?.original?.request_metadata?.invoked_by}</div>,
  },
];

export function RequestHistory({
  subComponentData,
  subComponentLoading,
}: Readonly<{
  subComponentData: InventoryRequestHistoryData[];
  subComponentLoading: boolean;
}>) {
  return (
    <div>
      <DataTable
        header={false}
        data={subComponentData}
        columns={columns}
        className="mx-14 my-3"
        search={false}
        loading={subComponentLoading}
        isViewShow={false}
        pagination={false}
      />
    </div>
  );
}
