import React, { useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import OrderTrackerTimeline from "./order-tracker-timeline";

type Props = { trackingNumber: string; orderId: string; trackingInfoId: string };

function Actions(props: Props) {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  return (
    <>
      {props?.trackingNumber && (
        <Button variant="dark" onClick={() => setIsTrackingModalOpen(true)} size="sm">
          <Eye size={18} />
        </Button>
      )}

      <Dialog
        open={isTrackingModalOpen}
        onOpenChange={() => {
          setIsTrackingModalOpen(!isTrackingModalOpen);
        }}
      >
        <DialogContent className="max-h-[500px] w-[550px] overflow-auto xl:max-h-[570px] 2xl:max-h-[650px] 2xl:w-[600px]">
          <OrderTrackerTimeline
            trackingNumber={props?.trackingNumber}
            orderId={props?.orderId}
            trackingInfoId={props?.trackingInfoId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Actions;
