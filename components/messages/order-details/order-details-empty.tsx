"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";
import { Package } from "lucide-react";

export function OrderDetailsEmpty() {
  const { buyerUsername, legacyItemId } = useMessagesOrderDetailsAtom();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Package className="size-6 stroke-[1.5]" />
      </div>
      <div className="max-w-md">
        <p className="text-sm font-semibold text-foreground">
          No orders found for this message
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {buyerUsername && legacyItemId ? (
            <>
              No order was found for buyer{" "}
              <span className="font-semibold text-foreground">@{buyerUsername}</span> and
              item{" "}
              <span className="font-mono font-medium text-foreground">
                #{legacyItemId}
              </span>
            </>
          ) : (
            "Order details are not available for this conversation."
          )}
        </p>
      </div>
    </div>
  );
}
