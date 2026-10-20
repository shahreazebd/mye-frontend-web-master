"use client";

import { MappedOpenOrder } from "@/schema/open-order";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";
import { PostagePreviewActionCell } from "./postage-preview-action-cell";

export const postagePreviewColumns: ColumnDef<MappedOpenOrder>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <>{row?.index + 1}</>,
    enableSorting: false,
  },
  {
    id: "1",
    header: ({ table }) => (
      <Checkbox
        checked={table?.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row?.getIsSelected()}
        onCheckedChange={(value) => row?.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "shipping_address.buyer_name",
    accessorKey: "shipping_address.buyer_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Buyer Name" />,
  },

  {
    accessorKey: "channel_order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
  },

  {
    id: "shipping_address.address1",
    accessorKey: "shipping_address.address1",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address 1" />,
  },

  {
    id: "shipping_address.address2",
    accessorKey: "shipping_address.address2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address 2" />,
  },
  {
    id: "shipping_address.country",
    accessorKey: "shipping_address.country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  },
  {
    id: "modified_sku",
    accessorKey: "modified_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    // cell: ({ row }) => (
    //   <span>
    //     {row.original?.quantity?.map((item: any, i) => (
    //       <div key={i} className="block w-14">
    //         {item}
    //       </div>
    //     ))}
    //   </span>
    // ),
  },
  {
    id: "total_weight",
    accessorKey: "total_weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Weight (gm)" />
    ),
    meta: {
      type: "number",
    },
  },

  {
    id: "shipping_address.post_code",
    accessorKey: "shipping_address.post_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Post Code" />,
  },
  {
    id: "Action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: PostagePreviewActionCell,
  },
];
