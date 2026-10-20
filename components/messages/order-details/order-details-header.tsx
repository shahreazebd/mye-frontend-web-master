"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";
import { Package, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function OrderDetailsHeader() {
  const {
    orderId,
    dispatchStatus,
    paymentStatus,
    buyerUsername,
    apiOrders,
    selectedOrderIndex,
    setSelectedOrderIndex,
  } = useMessagesOrderDetailsAtom();

  return (
    <DialogHeader className="border-b pb-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg text-primary">
          <ShoppingBag className="size-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-base font-semibold">
              {orderId ? `Order #${orderId}` : "Order Details"}
            </DialogTitle>
            {dispatchStatus && (
              <Badge
                variant={
                  dispatchStatus.toUpperCase() === "DISPATCHED" ? "default" : "secondary"
                }
                className={cn(
                  "h-5 text-[10px] font-semibold uppercase",
                  dispatchStatus.toUpperCase() === "DISPATCHED" &&
                    "bg-emerald-600 text-white hover:bg-emerald-600"
                )}
              >
                {dispatchStatus}
              </Badge>
            )}
            {paymentStatus && (
              <Badge
                variant="outline"
                className={cn(
                  "h-5 text-[10px] font-semibold uppercase",
                  paymentStatus.toUpperCase() === "PAID"
                    ? "border-emerald-500/40 text-emerald-600"
                    : "border-amber-500/40 text-amber-600"
                )}
              >
                {paymentStatus}
              </Badge>
            )}
          </div>
          <DialogDescription className="mt-0.5 text-xs text-muted-foreground">
            Order information and items
            {buyerUsername ? ` for buyer @${buyerUsername}` : ""}
          </DialogDescription>
        </div>
      </div>

      {/* Multiple Orders Selector (if order_count > 1) */}
      {apiOrders.length > 1 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t pt-2.5">
          <span className="text-[11px] font-medium text-muted-foreground">
            Matching Orders ({apiOrders.length}):
          </span>
          {apiOrders.map((ord, idx) => (
            <button
              key={ord.channel_order_id || ord.id || idx}
              type="button"
              onClick={() => setSelectedOrderIndex(idx)}
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                selectedOrderIndex === idx
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              <Package className="size-3" />
              <span>#{ord.channel_order_id || ord.id}</span>
              {ord.total && (
                <span className="text-[10px] opacity-75">
                  ({ord.total} {ord.currency})
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </DialogHeader>
  );
}
