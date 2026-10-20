import Image from "next/image";
import { truncateName } from "@/utils/helpers";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { ShipmentList } from "@/types/shipments";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import ShipmentAction from "./shipment-action";

export const shipmentColumns: ColumnDef<ShipmentList>[] = [
  {
    accessorKey: "storeName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Channel" />,
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={`/logos/marketplaces/round/${shipment.marketplace.toLowerCase()}.svg`}
            alt={shipment.marketplace ?? "Vendor"}
            width={32}
            height={32}
            className="object-cover"
          />
          <div>
            <div className="font-medium">
              {truncateName(shipment.storeName ?? "", 30)}
            </div>
            <div className="text-xs text-muted-foreground">
              {dayjs(shipment.createdAt).format("DD MMMM YYYY, h:mm A")}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "details",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" />,
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center overflow-hidden rounded">
            <Image
              src={
                shipment.carrier.type === "AMAZON"
                  ? "/logos/marketplaces/round/amazon.svg"
                  : `/logos/carriers/round/${shipment.carrier.type?.toLowerCase()}.svg`
              }
              alt={shipment.carrier.type ?? "Carrier"}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">
              {truncateName(shipment.carrier?.name ?? "", 30)}
            </div>
            <div className="text-xs text-muted-foreground">
              {shipment.carrier?.name ?? ""}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "orders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => {
      const shipment = row.original;
      const totalOrders = shipment?.orders?.length || 0;
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-500">
            #
          </span>
          <span className="text-sm font-semibold text-slate-800">{totalOrders}</span>
        </div>
      );
    },
  },
  {
    id: "success",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Success" />,
    cell: ({ row }) => {
      const shipment = row.original;
      const successCount =
        shipment?.orders?.filter((o) => o?.status === "SUCCESS").length || 0;
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex size-5 items-center justify-center rounded-full border text-[10px] font-bold",
              successCount > 0
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-slate-200 bg-slate-50 text-slate-400"
            )}
          >
            ✓
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              successCount > 0 ? "text-emerald-600" : "text-slate-400"
            )}
          >
            {successCount}
          </span>
        </div>
      );
    },
  },
  {
    id: "failed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Failed" />,
    cell: ({ row }) => {
      const shipment = row.original;
      const failedCount =
        shipment?.orders?.filter((o) => o?.status === "FAILED").length || 0;
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex size-5 items-center justify-center rounded-full border text-[10px] font-bold",
              failedCount > 0
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-slate-200 bg-slate-50 text-slate-400"
            )}
          >
            ✕
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              failedCount > 0 ? "text-rose-600" : "text-slate-400"
            )}
          >
            {failedCount}
          </span>
        </div>
      );
    },
  },
  {
    id: "percentage",
    header: "Percentage",
    cell: ({ row }) => {
      const shipment = row.original;
      const totalOrders = shipment?.orders?.length || 0;
      const successCount =
        shipment?.orders?.filter((o) => o?.status === "SUCCESS").length || 0;
      const failedCount =
        shipment?.orders?.filter((o) => o?.status === "FAILED").length || 0;
      const progress = totalOrders
        ? Math.round(((successCount + failedCount) / totalOrders) * 100)
        : 0;

      return (
        <div className="flex w-40 items-center gap-3">
          {totalOrders > 0 && shipment.status !== "WAITING" ? (
            <>
              <Progress value={progress} className="h-2 flex-1" showLabel={false} />
              <span className="w-8 text-right text-xs font-semibold text-slate-700">
                {progress}%
              </span>
            </>
          ) : (
            <span className="text-xs font-medium text-slate-400">-</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const shipment = row.original;
      return <ShipmentAction shipment={shipment} />;
    },
  },
];
