"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { ReturnOrder } from "@/types/return-order";
import { Badge } from "@/components/ui/badge";
import { CopyText } from "@/components/shared/copy-text";

export const columns: ColumnDef<ReturnOrder>[] = [
  {
    id: "tracking_id",
    accessorKey: "tracking_id",
    header: "Tracking ID",
    cell: ({ row }) => {
      const trackingId = row.original?.tracking_id;

      return (
        <div className="group flex items-center gap-2">
          {trackingId || "-"}

          <CopyText text={row.original?.tracking_id || ""} />
        </div>
      );
    },
  },
  {
    id: "sku",
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <div className="group flex items-center gap-2">
        {row.original?.sku || "-"}

        <CopyText text={row.original?.sku || ""} />
      </div>
    ),
  },
  {
    id: "item_name",
    accessorKey: "item_name",
    header: "Item Name",
    cell: ({ row }) => {
      const name = row.original?.item_name || "-";
      const max = 30;
      const display = name.length > max ? `${name.slice(0, max)}...` : name;
      return (
        <span className="group flex items-center gap-2 text-sm" title={name}>
          {display}
          <CopyText text={name} />
        </span>
      );
    },
  },
  {
    id: "order_id",
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="group flex w-[180px] items-center gap-2">
        {row.original?.order_id || "-"}

        <CopyText text={row.original?.order_id || ""} />
      </div>
    ),
  },
  {
    id: "metadata.channel_name",
    accessorKey: "metadata.channel_name",
    header: "Channel Name",
    cell: ({ row }) => (
      <div className="text-sm">{row.original?.metadata?.channel_name || "-"}</div>
    ),
  },
  {
    id: "ordered_quantity",
    accessorKey: "ordered_quantity",
    header: "Order Quantity",
    cell: ({ row }) => {
      const quantity = row.original?.ordered_quantity;

      return <div className="text-sm">{quantity ?? "-"}</div>;
    },
  },
  {
    id: "return_quantity",
    accessorKey: "return_quantity",
    header: "Return Quantity",
    cell: ({ row }) => (
      <div className="text-sm">{row.original?.return_quantity ?? "-"}</div>
    ),
  },
  {
    id: "return_id",
    accessorKey: "return_id",
    header: "Return ID",
    cell: ({ row }) => {
      const returnId = row.original?.return_id;

      return <div className="text-sm">{returnId ?? "-"}</div>;
    },
  },
  {
    id: "asin",
    accessorKey: "asin",
    header: "ASIN ID/Item ID",
    cell: ({ row }) => {
      const asin = row.original?.asin || row.original?.item_id || "-";

      return (
        <span className="group flex items-center gap-2 text-sm" title={asin}>
          {asin}
          <CopyText text={asin} />
        </span>
      );
    },
  },
  {
    id: "order_date",
    accessorKey: "order_date",
    header: "Order Date",
    cell: ({ row }) => {
      const orderDate = row.original?.order_date;

      return (
        <div className="text-sm">
          {orderDate ? dayjs(orderDate).format("DD-MM-YYYY") : "-"}
        </div>
      );
    },
  },
  {
    id: "return_date",
    accessorKey: "return_request_date",
    header: "Return Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original?.return_request_date
          ? dayjs(row.original.return_request_date).format("DD-MM-YYYY")
          : "-"}
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original?.status || "-"}</Badge>,
  },
  {
    id: "carrier",
    accessorKey: "carrier",
    header: "Carrier Name",
    cell: ({ row }) => <div className="text-sm">{row.original?.carrier || "-"}</div>,
  },
];
