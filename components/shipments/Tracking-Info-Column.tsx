import { CellContext } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { PostageOrder } from "@/types/postage";

// import OrderTrackerTimeline from "../order/track-orders/order-tracker-timeline";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function TrackingInfoColumn(props: CellContext<PostageOrder, unknown>) {
  const { trackingNumber, trackingInfo } = props?.row?.original ?? {};

  return (
    <section className="flex items-center gap-4">
      {trackingNumber && trackingNumber !== "N/A" && (
        <>
          <Popover>
            <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" className="h-8 px-2">
                <Eye className="size-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[300px] w-[500px] overflow-auto 2xl:max-h-[400px]">
              {/* <OrderTrackerTimeline trackingNumber={trackingNumber} orderId={orderId} trackingInfoId={trackingInfo?.id} /> */}
            </PopoverContent>
          </Popover>
          {trackingInfo?.status && (
            <span>{trackingInfo?.status.replaceAll("_", " ")}</span>
          )}
        </>
      )}
    </section>
  );
}

export default TrackingInfoColumn;
