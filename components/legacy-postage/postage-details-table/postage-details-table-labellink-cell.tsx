import React, { useState } from "react";
import { usePostageAtom, useUploadTrackingOrderIDsAtom } from "@/atoms/postageAtom";
import { CellContext } from "@tanstack/react-table";
import { Loader, Loader2 } from "lucide-react";

import { PostageOrder } from "@/types/postage";
import { useGenerateLabel } from "@/hooks/queries/postage/use-generate-label";

import { Button } from "../../ui/button";
import { UploadTrackingButton } from "./upload-tracking-button";

export function PostageDetailsTableLabelLinkCell({
  row,
}: CellContext<PostageOrder, unknown>) {
  const { postageInfo, setPostageInfo } = usePostageAtom();
  const { mutate: generateLabel, isLoading } = useGenerateLabel();
  const { trackingOrderIds } = useUploadTrackingOrderIDsAtom();

  const [isDownloading, setIsDownloading] = useState(false);

  async function downloadHandler() {
    try {
      setIsDownloading(true);
      const response = await fetch(row.original.labelLink);
      const blob = await response.blob();

      const fileName =
        row.original.labelLink.split("/").pop()?.split("?")[0] || "postage.pdf";

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }

  function onSuccess(res: any) {
    setPostageInfo((prev) => ({
      ...prev,
      selectedPostage: {
        ...prev.selectedPostage,
        orders: prev.selectedPostage.orders.map((order: any) => {
          if (order._id === row.original._id) {
            return {
              ...order,
              labelLink: res?.data.data,
            };
          }
          return order;
        }),
      },
    }));
  }

  function getLabelHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    if (postageInfo.selectedPostage.service.name === "AMAZON") {
      const payload = {
        type: "amazon" as const,
        trackingNumber: row.original.postageIdentifier,
        body: {
          object_id: row.original._id,
          channel_uuid: postageInfo.selectedPostage.channelUuid,
        },
      };

      generateLabel(payload, {
        onSuccess: onSuccess,
      });

      return;
    }

    if (postageInfo.selectedPostage.service.type === "CLICKANDDROP") {
      const payload = {
        type: "clickanddrop" as const,
        service: postageInfo.selectedPostage.service.type,
        service_meta_data: {
          service_name: postageInfo.selectedPostage.service.type,
          shipping_service_uuid: postageInfo.selectedPostage.service.serviceUuid,
        },
        order_identifier: row.original.postageIdentifier,
        object_id: row.original._id,
      };

      generateLabel(payload, {
        onSuccess: onSuccess,
      });
      return;
    }

    const payload = {
      type: "evri-dhl" as const,
      service: postageInfo.selectedPostage.service.type,
      service_meta_data: {
        shipment_service_uuid: postageInfo.selectedPostage.service.serviceUuid,
      },
      data: [
        {
          trackingNumber: row.original.trackingNumber,
          object_id: row.original._id,
        },
      ],
    };

    generateLabel(payload, {
      onSuccess: onSuccess,
    });
  }

  return (
    <div className="flex items-center gap-2">
      {row.original.labelLink ? (
        <Button
          className="z-[2] h-8 w-[130px]"
          variant="default"
          onClick={(e) => {
            e.stopPropagation();
            downloadHandler();
          }}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader className="w-4 animate-spin" /> : "Download"}
        </Button>
      ) : (
        <>
          {row.original.status === "SUCCESS" && (
            <>
              {(["EVRI", "DHL", "CLICKANDDROP"].includes(
                postageInfo.selectedPostage.service.type
              ) ||
                postageInfo?.selectedPostage.service.name === "AMAZON") && (
                <Button
                  className="z-[2] h-8"
                  variant="outline"
                  disabled={isLoading}
                  onClick={getLabelHandler}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Label"
                  )}
                </Button>
              )}
            </>
          )}
        </>
      )}

      {!trackingOrderIds.includes(row.original.orderId) &&
        postageInfo.selectedPostage.channel.channel_type === "ebay" &&
        row.original.status === "SUCCESS" && (
          <UploadTrackingButton postageDetails={row.original} />
        )}
    </div>
  );
}
