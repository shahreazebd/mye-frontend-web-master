import type { CellContext } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { DispatchedOrderDetails } from "@/types/dispatched-order";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function OrderIdColumn(
  props: CellContext<DispatchedOrderDetails, unknown>
) {
  const { shipping_address } = props.row.original;

  return (
    <section className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          {props?.row?.original?.market_place === "AMAZON" && (
            <Button variant="outline" className="h-8 px-2">
              <Eye className="size-4 text-gray-400" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="grid gap-2 px-2">
            <div className="space-y-2">
              <p className="font-medium leading-none">Order Details</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Buyer Name</Label>
                <span>{shipping_address?.buyer_name?.trim()}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="maxWidth">Address 1</Label>
                <span>{shipping_address?.address1?.trim()}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="height">Address 2</Label>
                <span>{shipping_address?.address2?.trim()}</span>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <Label>City</Label>
                <span>{shipping_address?.city}</span>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Postcode</Label>
                <span>{shipping_address?.post_code}</span>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <Label>Country Code</Label>
                <span>{shipping_address?.country}</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {props?.row?.getValue("channel_order_id")}
    </section>
  );
}
