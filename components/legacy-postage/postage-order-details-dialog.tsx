"use client";

import { usePostageAtom } from "@/atoms/postageAtom";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { PostageDetailsTabs } from "./postage-details-table/postage-details-tabs";

export default function PostageOrderDetailsDialog() {
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
      <DialogContent className="flex  w-[90%] flex-col justify-start overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {`${postageInfo.selectedPostage?.channelName} (${postageInfo.selectedPostage?.service?.type})`}
          </DialogTitle>
        </DialogHeader>

        <div>
          <PostageDetailsTabs />
        </div>
      </DialogContent>
    </Dialog>
  );
}
