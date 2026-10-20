import React from "react";
import {
  usePostageAtom,
  useSelectedPostageChannelId,
  useShippingCodeSelectAtom,
  useUploadTrackingOrderIDsAtom,
} from "@/atoms/postageAtom";
import { OpenOrderDetailsResponse } from "@/schema/open-order";
import { Loader } from "lucide-react";

import { PostageOrder } from "@/types/postage";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { usePostUploadTracking } from "@/hooks/queries/order-shipping/use-post-upload-tracking";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function UploadTrackingButton({
  postageDetails,
}: {
  postageDetails: PostageOrder;
}) {
  const { postageInfo } = usePostageAtom();
  const { selectedPostageChannelId } = useSelectedPostageChannelId();
  const { shippingCode } = useShippingCodeSelectAtom();
  const { setTrackingOrderIds } = useUploadTrackingOrderIDsAtom();
  const { userInformation } = useAuth();

  const { mutate: uploadTracking, isLoading } = usePostUploadTracking();

  const handleUploadTracking = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      const url = `orders/api/v1/orders/get-order-details?company_uid=${userInformation?.company_uid}&channel_uid=${selectedPostageChannelId}&order_id=${postageDetails.orderId}`;

      const res = await fetch.get<OpenOrderDetailsResponse>(url);

      const lineItems =
        res?.data?.data?.order_meta?.lineItems?.map((item) => ({
          lineItemId: item.lineItemId,
          quantity: item.quantity,
        })) || [];

      const payload = {
        channelUid: selectedPostageChannelId,
        orders: [
          {
            orderId: postageDetails.orderId,
            shippingCarrierCode: shippingCode,
            trackingNumber:
              postageInfo.selectedPostage.service?.type === "CLICKANDDROP"
                ? postageDetails?.postageIdentifier
                : (postageDetails.trackingNumber as string),
            lineItems,
          },
        ],
      };

      uploadTracking(payload, {
        onSuccess: (res) => {
          const { successful_orders, failed_orders } = res?.data?.data ?? {};

          if (successful_orders?.length) {
            setTrackingOrderIds((prev) => [...prev, postageDetails.orderId]);
            toast({
              title: "Success",
              description: `Order ID ${postageDetails.orderId} tracking uploaded successfully.`,
              variant: "default",
            });
          }

          if (failed_orders?.length) {
            toast({
              title: "Error",
              description: `Order ID ${postageDetails.orderId} tracking failed to update.`,
              variant: "destructive",
            });
          }
        },
      });
    } catch (error: any) {
      toast({
        title: "Network Error",
        description:
          error?.response?.data?.message ||
          "An unexpected error occurred while get order details.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      className="w-32 disabled:cursor-pointer disabled:opacity-50"
      size="sm"
      onClick={(e) => handleUploadTracking(e)}
      disabled={isLoading || !shippingCode}
    >
      {isLoading ? <Loader className="w-4 animate-spin" /> : "Upload Tracking"}
    </Button>
  );
}
