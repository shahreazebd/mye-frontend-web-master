"use client";

import { usePostageAtom } from "@/atoms/postageAtom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ShipmentDetailsTabs } from "./shipment-details-table/shipment-details-tabs";

export default function ShipmentOrderDetailsDialog() {
  const { postageInfo, setPostageInfo } = usePostageAtom();

  return (
    <Dialog
      open={postageInfo.isPostageDetailsModalOpen}
      onOpenChange={() => {
        setPostageInfo((prev) => ({
          ...prev,
          isPostageDetailsModalOpen: !prev.isPostageDetailsModalOpen,
        }));
      }}
    >
      <DialogContent className="flex w-[95vw] flex-col justify-start overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {`${postageInfo.selectedPostage?.storeName} (${postageInfo.selectedPostage?.carrier?.type})`}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Shipment order details
          </DialogDescription>
        </DialogHeader>

        <div>
          <ShipmentDetailsTabs />
        </div>
      </DialogContent>
    </Dialog>
  );
}
