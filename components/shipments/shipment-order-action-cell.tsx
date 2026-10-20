"use client";

import { useShipmentOrderDialogAtom } from "@/atoms/postageAtom";
import { Eye } from "lucide-react";

import type { ShipmentOrderListItem } from "@/types/shipments";
import { Button } from "@/components/ui/button";

export function ShipmentOrderActionCell({
  order,
}: Readonly<{ order: ShipmentOrderListItem }>) {
  const { openDetails, openBuyReturn } = useShipmentOrderDialogAtom();

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Button
        size="sm"
        variant="outline"
        className="size-8 p-0"
        onClick={() => openDetails(order.id)}
        title="View Details"
      >
        <Eye className="size-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => openBuyReturn(order.id)}
        title="Buy Return Shipment"
      >
        Buy Return
      </Button>
    </div>
  );
}
