"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function OrderDetailsSummaryTab() {
  const { summaryData } = useMessagesOrderDetailsAtom();

  return (
    <div className="divide-y rounded-md border bg-card text-xs">
      {summaryData.map((item) => (
        <div key={item.key} className="flex items-center justify-between px-4 py-2.5">
          <span className="font-medium text-muted-foreground">{item.key}</span>
          <div className="flex items-center gap-1.5">
            {item.badge ? (
              <Badge
                variant={item.badgeVariant || "secondary"}
                className={cn(
                  "h-5 px-2 text-[10px] font-semibold uppercase",
                  item.value.toLowerCase() === "paid" &&
                    "bg-emerald-600 text-white hover:bg-emerald-600",
                  item.value.toLowerCase() === "dispatched" &&
                    "border-emerald-500/40 text-emerald-600"
                )}
              >
                {item.value}
              </Badge>
            ) : (
              <span className="font-medium text-foreground">{item.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
