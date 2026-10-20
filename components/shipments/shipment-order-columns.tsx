import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Download } from "lucide-react";

import type { ShipmentOrderListItem } from "@/types/shipments";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { ShipmentOrderActionCell } from "./shipment-order-action-cell";

// Brands are stylised ("eBay", "WooCommerce"), so title-casing the code is wrong.
const MARKETPLACE_LABELS: Record<string, string> = {
  AMAZON: "Amazon",
  EBAY: "eBay",
  OTTO: "OTTO",
  SHOPIFY: "Shopify",
  WOOCOMMERCE: "WooCommerce",
  TIKTOK: "TikTok",
  TEMU: "Temu",
  SHEIN: "SHEIN",
  WALMART: "Walmart",
};

function marketplaceLabel(value?: string | null) {
  if (!value) return "";
  const trimmed = value.trim();
  return MARKETPLACE_LABELS[trimmed.toUpperCase()] || trimmed;
}

export const shipmentOrderColumns: ColumnDef<ShipmentOrderListItem>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "marketplaceOrderId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => <div>{row.original.marketplaceOrderId || "-"}</div>,
  },
  {
    id: "marketplace",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Marketplace" />,
    cell: ({ row }) => {
      const { marketplace, storeName } = row.original.shipment ?? {};
      const label = marketplaceLabel(marketplace);

      if (!label) return <div>-</div>;

      return (
        <div className="flex items-center gap-2">
          {/* No round logo ships for every marketplace (e.g. Temu, Shein), so the
              AvatarFallback initials take over when the image 404s. */}
          <Avatar className="size-7">
            <AvatarImage
              src={`/logos/marketplaces/round/${marketplace?.trim().toLowerCase()}.svg`}
              alt={label}
            />
            <AvatarFallback className="text-[10px] font-medium text-slate-600">
              {label.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            {/* Store name is the primary identifier; the marketplace it belongs
                to reads as the secondary line. */}
            <p className="truncate text-xs font-medium text-slate-700">
              {storeName || label}
            </p>
            {storeName ? (
              <p className="whitespace-nowrap text-[11px] text-slate-500">{label}</p>
            ) : null}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "originalSku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => (
      <div className="max-w-[150px] break-all text-xs font-medium text-slate-700">
        {row.original.originalSku || "-"}
      </div>
    ),
  },
  {
    accessorKey: "purchaseDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Date" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.purchaseDate
          ? dayjs(row.original.purchaseDate).format("DD MMM YYYY, hh:mm a")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const colors = {
        SUCCESS: "border-green-200 bg-green-50 text-green-700",
        FAILED: "border-red-200 bg-red-50 text-red-700",
        PROCESSING: "border-yellow-200 bg-yellow-50 text-yellow-700",
      };
      return (
        <Badge
          variant="outline"
          className={cn(colors[status as keyof typeof colors] || "")}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "trackingNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracking Number" />
    ),
    cell: ({ row }) => {
      const trackingNumber = row.original.trackingNumber;
      const labelLink = row.original.labelLink;
      return (
        <div className="flex items-center gap-2">
          <span>{trackingNumber || "-"}</span>
          {labelLink && (
            <a
              href={labelLink}
              target="_blank"
              rel="noreferrer"
              title="Download Shipping Label"
            >
              <Button
                size="sm"
                variant="outline"
                className="size-6 !h-6 !w-6 shrink-0 p-0"
              >
                <Download className="size-3" />
              </Button>
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "returnTrackingNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Return Tracking" />
    ),
    cell: ({ row }) => <div>{row.original.returnTrackingNumber || "-"}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ShipmentOrderActionCell order={row.original} />,
  },
];
