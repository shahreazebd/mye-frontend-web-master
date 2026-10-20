import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Order } from "@/types/shipments";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import { ShipmentDetailsAddressCell } from "./shipment-details-address-cell";
import { ShipmentDetailsStatusCell } from "./shipment-details-status-cell";
import { ShipmentDetailsTableLabelLinkCell } from "./shipment-details-table-labellink-cell";

export const shipmentDetailsColumns = (marketplace?: string, channeUid?: string) => {
  const ordersColumn: ColumnDef<Order>[] = [
    {
      id: "1",
      header: ({ table }) => (
        <Checkbox
          checked={table?.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="size-3 translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row?.getIsSelected()}
          onCheckedChange={(value) => row?.toggleSelected(!!value)}
          aria-label="Select row"
          className="size-3 translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "#",
      accessorKey: "#",
      header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "marketplaceOrderId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            {row.getValue("marketplaceOrderId")}
          </div>
        );
      },
    },
    {
      accessorKey: "mergedOrderIds",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Merge Order Ids" />
      ),
      cell: ({ row }) => {
        const mergedOrderIds = (row.original.mergedOrderIds || []).filter(
          (item) => item !== row.original.marketplaceOrderId
        );

        const ids = mergedOrderIds.length ? mergedOrderIds.join(", ") : "-";

        return <div>{ids}</div>;
      },
    },
    {
      accessorKey: "shippingAddress",
      header: "Shipping Address",
      cell: ShipmentDetailsAddressCell,
    },
    {
      accessorKey: "trackingNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tracking Number" />
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          {row.getValue("trackingNumber") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ShipmentDetailsStatusCell,
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => {
        const updatedAt = row.original.updatedAt;
        return (
          <div>{updatedAt ? dayjs(updatedAt).format("DD MMM YYYY, hh:mm a") : "-"}</div>
        );
      },
    },
    {
      accessorKey: "trackingUploadStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tracking Upload Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.trackingUploadStatus;

        const statusColors = {
          SUCCESS: "bg-emerald-500",
          FAILED: "bg-red-500",
          PENDING: "bg-yellow-500",
        };

        return (
          <Badge
            variant="outline"
            className={cn(
              "rounded-sm border-none font-bold text-white",
              statusColors[status as keyof typeof statusColors] || "bg-gray-500"
            )}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "labelLink",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
      cell: ({ row }) => (
        <ShipmentDetailsTableLabelLinkCell
          row={row}
          marketplace={marketplace}
          channelUid={channeUid}
        />
      ),
    },
  ];

  return ordersColumn;
};
