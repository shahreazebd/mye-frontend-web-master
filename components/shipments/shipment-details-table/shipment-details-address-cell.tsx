import { useState } from "react";
import type { CellContext } from "@tanstack/react-table";
import { Edit2, RefreshCw } from "lucide-react";

import { Order } from "@/types/shipments";
import { cn } from "@/lib/utils";
import { useBuyLabelFromOrderId } from "@/hooks/queries/shipments/use-buy-label-from-order-id";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { ShipmentDetailsAddressEditDialog } from "./shipment-details-address-edit-dialog";

export function ShipmentDetailsAddressCell({ row }: CellContext<Order, unknown>) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutate: buyLabel, isLoading: isBuying } = useBuyLabelFromOrderId();

  const { buyerName, addressLine1, addressLine2, city, postCode, country } =
    row?.original?.address ?? {};

  const status = row?.original?.status;
  const orderId = row?.original?.id;

  const fullAddress = [addressLine1, addressLine2, city, postCode, country]
    .filter(Boolean)
    .join(", ");

  const shippingAddress = [
    { key: "Recipient", value: buyerName?.trim() },
    { key: "Street", value: addressLine1 },
    { key: "Line 2", value: addressLine2 },
    { key: "City", value: city },
    { key: "Post Code", value: postCode },
    { key: "Country", value: country },
  ].filter((e) => Boolean(e.value));

  return (
    <div className="w-[280px] py-1 2xl:w-[350px]">
      <div className="flex flex-col gap-1">
        <HoverCard openDelay={50} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="group flex cursor-help flex-col gap-0.5">
              <p className="text-sm font-medium text-slate-900 transition-colors group-hover:text-primary">
                {buyerName}
              </p>
              <p className="truncate text-[11px] leading-normal text-slate-600">
                {fullAddress}
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0 shadow-lg" sideOffset={5} align="start">
            <div className="rounded-sm border bg-white px-5 py-3">
              <p className="mb-3 border-b pb-2 text-sm font-medium text-slate-700">
                Shipping Address
              </p>
              <div className="space-y-1.5">
                {shippingAddress?.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="shrink-0 text-xs text-slate-500">{item.key}</span>
                    <span className="text-right text-xs font-medium text-slate-700">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {["FAILED", "PROCESSING"].includes(status || "") && (
          <div className="mt-1 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-primary/5 h-6 gap-1 rounded-sm border-primary px-2 text-[10px] text-primary hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
            >
              <Edit2 className="size-2.5" />
              Edit Address
            </Button>
            <Button
              size="sm"
              variant="default"
              className="h-6 gap-1 rounded-sm px-2 text-[10px]"
              disabled={isBuying}
              onClick={(e) => {
                e.stopPropagation();
                if (orderId) buyLabel(orderId);
              }}
            >
              <RefreshCw className={cn("size-2.5", isBuying && "animate-spin")} />
              Retry
            </Button>
          </div>
        )}
      </div>

      {orderId && row.original.address && (
        <ShipmentDetailsAddressEditDialog
          orderId={orderId}
          address={row.original.address}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </div>
  );
}
