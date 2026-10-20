"use client";

import Image from "next/image";
import { truncateName } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { TrackingListItem } from "@/types/tracking";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Actions from "./order-tracker-actions";

export const columns: ColumnDef<TrackingListItem>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <span className="text-muted-foreground">{row?.index + 1}</span>,
  },
  {
    id: "trackingNumber",
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => (
      <div className="font-semibold text-slate-900">
        {row?.getValue("trackingNumber")}
      </div>
    ),
  },
  {
    id: "buyerInfo",
    accessorKey: "order.address.buyerName",
    header: "Buyer Info",
    cell: ({ row }) => {
      const address = row?.original?.order?.address;
      if (!address) return "-";

      const fullAddress = [
        { key: "Buyer Name", value: address.buyerName },
        { key: "Phone", value: address.phone },
        { key: "Email", value: address.email },
        { key: "Address 1", value: address.addressLine1 },
        { key: "Address 2", value: address.addressLine2 },
        { key: "Post Code", value: address.postCode },
        { key: "City", value: address.city },
        { key: "Country", value: address.country || address.countryCode },
      ].filter((e) => Boolean(e.value));

      return (
        <div className="w-[180px] 2xl:w-[220px]" onClick={(e) => e.stopPropagation()}>
          <HoverCard openDelay={50} closeDelay={0}>
            <HoverCardTrigger>
              <div className="cursor-help">
                <span className="block text-sm font-semibold text-slate-900">
                  {address.buyerName}
                </span>
                <span className="text-[11px] capitalize text-slate-500">
                  {address.city?.toLowerCase()}, {address.countryCode || address.country}
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="right" align="start">
              <div className="rounded-md border bg-white p-4 shadow-sm">
                <p className="mb-2 border-b pb-1 text-sm font-semibold text-slate-800">
                  Shipping Address
                </p>
                <div className="space-y-1.5">
                  {fullAddress.map((item) => (
                    <p key={item.key} className="text-xs">
                      <span className="font-medium text-slate-500">{item.key}: </span>
                      <span className="text-slate-800">{item.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    id: "storeName",
    accessorKey: "shipment.storeName",
    header: "Store",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative size-8 overflow-hidden rounded-full border bg-slate-50">
          <Image
            src={`/logos/marketplaces/round/${row?.original?.shipment?.marketplace?.toLowerCase()}.svg`}
            alt={row?.original?.shipment?.marketplace ?? "Vendor"}
            fill
            className="rounded-full object-contain p-1"
          />
        </div>
        <div>
          <div className="font-medium text-slate-900">
            {truncateName(row?.original?.shipment?.storeName ?? "", 30)}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {row?.original?.shipment?.marketplace}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "carrierType",
    accessorKey: "shipment.carrierType",
    header: "Carrier",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative size-8 overflow-hidden rounded-full border bg-slate-50">
          <Image
            src={`/logos/carriers/round/${row?.original?.shipment?.carrierType?.toLowerCase()}.svg`}
            alt={row?.original?.shipment?.carrierType ?? "Carrier"}
            fill
            className="rounded-full object-contain p-1"
          />
        </div>
        <div className="text-sm font-medium capitalize text-slate-700">
          {row?.original?.shipment?.carrierType?.toLowerCase()?.replace("_", " ")}
        </div>
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status || row?.original?.lastKnownStatus;
      return (
        <div>
          <p className="text-sm font-semibold capitalize text-slate-900">
            {status?.split("_")?.join(" ")?.toLowerCase()}
          </p>
          {row?.original?.deliveredAt && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {dayjs(row?.original?.deliveredAt).format("DD MMM, hh:mmA")}
            </p>
          )}
        </div>
      );
    },
  },
  {
    id: "syncStatus",
    accessorKey: "syncStatus",
    header: "Sync Status",
    cell: ({ row }) => {
      const syncStatus = row?.original?.syncStatus;
      const failureReason = row?.original?.failureReason;
      const failedAttempts = row?.original?.failedAttempts;

      const statusColor: Record<string, string> = {
        SUCCESS: "text-emerald-700 bg-emerald-50 border-emerald-200",
        PENDING: "text-amber-700 bg-amber-50 border-amber-200",
        FAILED: "text-red-700 bg-red-50 border-red-200",
      };

      return (
        <div>
          <span
            className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
              statusColor[syncStatus] || "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {syncStatus}
          </span>
          {syncStatus === "FAILED" && failureReason && (
            <p
              className="mt-0.5 max-w-[140px] truncate text-[11px] text-muted-foreground"
              title={failureReason}
            >
              {failureReason}
            </p>
          )}
          {syncStatus === "FAILED" && failedAttempts > 0 && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {failedAttempts} attempt{failedAttempts > 1 ? "s" : ""}
            </p>
          )}
        </div>
      );
    },
  },
  {
    id: "lastEventAt",
    accessorKey: "lastEventAt",
    header: "Last Event",
    cell: ({ row }) => (
      <div>
        {row?.original?.lastEventAt ? (
          <>
            <p className="text-sm font-medium text-slate-900">
              {dayjs(row?.original?.lastEventAt).format("DD MMM YYYY")}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {dayjs(row?.original?.lastEventAt).format("hh:mm A")}
            </p>
          </>
        ) : (
          <span className="text-sm text-slate-400">-</span>
        )}
      </div>
    ),
  },
  {
    id: "lastCheckAt",
    accessorKey: "lastCheckAt",
    header: "Last Checked",
    cell: ({ row }) => (
      <div>
        {row?.original?.lastCheckAt ? (
          <>
            <p className="text-sm font-medium text-slate-900">
              {dayjs(row?.original?.lastCheckAt).format("hh:mm A")}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {dayjs(row?.original?.lastCheckAt).format("DD MMM YYYY")}
            </p>
          </>
        ) : (
          <span className="text-sm text-slate-400">-</span>
        )}
      </div>
    ),
  },
  {
    id: "nextCheckAt",
    accessorKey: "nextCheckAt",
    header: "Next Check",
    cell: ({ row }) => (
      <div>
        {row?.original?.nextCheckAt ? (
          <>
            <p className="text-sm font-medium text-slate-900">
              {dayjs(row?.original?.nextCheckAt).format("hh:mm A")}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {dayjs(row?.original?.nextCheckAt).format("DD MMM YYYY")}
            </p>
          </>
        ) : (
          <span className="text-sm text-slate-400">-</span>
        )}
      </div>
    ),
  },
  // {
  //   id: "estimatedDelivery",
  //   accessorKey: "estimatedDelivery",
  //   header: "Est. Delivery",
  //   cell: ({ row }) => (
  //     <div>
  //       {row?.original?.estimatedDelivery ? (
  //         <>
  //           <p className="text-sm font-medium text-slate-900">
  //             {dayjs(row?.original?.estimatedDelivery).format("DD MMM YYYY")}
  //           </p>
  //           <p className="mt-0.5 text-[11px] text-muted-foreground">
  //             {dayjs(row?.original?.estimatedDelivery).format("hh:mm A")}
  //           </p>
  //         </>
  //       ) : (
  //         <span className="text-sm text-slate-400">-</span>
  //       )}
  //     </div>
  //   ),
  // },
  {
    id: "purchaseDate",
    accessorKey: "purchaseDate",
    header: "Purchased",
    cell: ({ row }) => (
      <div>
        {row?.original?.purchaseDate ? (
          <>
            <p className="text-sm font-medium text-slate-900">
              {dayjs(row?.original?.purchaseDate).format("DD MMM YYYY")}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {dayjs(row?.original?.purchaseDate).format("hh:mm A")}
            </p>
          </>
        ) : (
          <span className="text-sm text-slate-400">-</span>
        )}
      </div>
    ),
  },
  // {
  //   id: "createdAt",
  //   accessorKey: "createdAt",
  //   header: "Created",
  //   cell: ({ row }) => (
  //     <div>
  //       {row?.original?.createdAt ? (
  //         <>
  //           <p className="text-sm font-medium text-slate-900">
  //             {dayjs(row?.original?.createdAt).format("DD MMM YYYY")}
  //           </p>
  //           <p className="mt-0.5 text-[11px] text-muted-foreground">
  //             {dayjs(row?.original?.createdAt).format("hh:mm A")}
  //           </p>
  //         </>
  //       ) : (
  //         <span className="text-sm text-slate-400">-</span>
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Actions
        trackingNumber={row?.getValue("trackingNumber")}
        orderId={row?.original?.orderId}
        trackingInfoId={row?.original?.id}
      />
    ),
  },
];
