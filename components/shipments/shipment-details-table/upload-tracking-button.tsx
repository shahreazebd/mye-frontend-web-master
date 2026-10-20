import React from "react";
import { useShippingCodeSelectAtom } from "@/atoms/postageAtom";
import { OpenOrderDetailsResponse } from "@/schema/open-order";
import { Loader } from "lucide-react";

import { Order } from "@/types/shipments";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { usePostUploadTracking } from "@/hooks/queries/order-shipping/use-post-upload-tracking";
import {
  OttoTrackingUploadPayload,
  useOttoTrackingUpload,
} from "@/hooks/queries/shipments/use-otto-tracking-upload";
import { useUpdateShipmentOrders } from "@/hooks/queries/shipments/use-update-shipment-orders";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function UploadTrackingButton({
  postageDetails,
  channelUid,
  marketplace,
}: Readonly<{
  postageDetails: Order;
  channelUid?: string;
  marketplace?: string;
}>) {
  const { shippingCode } = useShippingCodeSelectAtom();
  const { userInformation } = useAuth();

  const { mutate: uploadTracking, isLoading } = usePostUploadTracking();

  const { mutate: uploadOttoTracking, isLoading: isOttoLoading } =
    useOttoTrackingUpload();

  const { mutate: updateShipmentOrders, isLoading: isUpdating } =
    useUpdateShipmentOrders();

  async function uploadEbayTracking(orderId: string) {
    try {
      const url = `orders/api/v1/orders/get-order-details?company_uid=${userInformation?.company_uid}&channel_uid=${channelUid}&order_id=${orderId}`;

      const res = await fetch.get<OpenOrderDetailsResponse>(url);

      const lineItems =
        res?.data?.data?.order_meta?.lineItems?.map((item) => ({
          lineItemId: item.lineItemId,
          quantity: item.quantity,
        })) || [];

      const payload = {
        channelUid: channelUid,
        orders: [
          {
            orderId,
            shippingCarrierCode: shippingCode,
            trackingNumber: postageDetails.trackingNumber,
            lineItems,
          },
        ],
      };

      uploadTracking(payload as any, {
        onSuccess: (res) => {
          const { successful_orders, failed_orders } = res?.data?.data ?? {};

          if (successful_orders?.length) {
            toast({
              title: "Success",
              description: `Order ID ${orderId} tracking uploaded successfully.`,
              variant: "default",
            });
          }

          if (failed_orders?.length) {
            toast({
              title: "Error",
              description: `Order ID ${orderId} tracking failed to update.`,
              variant: "destructive",
            });
          }
        },

        onError: () => {
          updateShipmentOrders({
            id: postageDetails.id,
            data: {
              trackingUploadStatus: "FAILED",
            },
          });
        },
      });
    } catch (error: any) {
      toast({
        title: "Network Error",
        description:
          error?.response?.data?.message ||
          "An unexpected error occurred while getting order details.",
        variant: "destructive",
      });
    }
  }
  function handleOttoUpload() {
    const mainId = postageDetails.marketplaceOrderId;
    const payload: OttoTrackingUploadPayload = {
      channel_uid: channelUid!,
      carrier: shippingCode,
      tracking_number: postageDetails.trackingNumber || "",
      return_tracking_number: postageDetails.returnTrackingNumber || "",
      city: postageDetails.address?.city || "",
      country_code: postageDetails.address?.countryCode || "",
      zip_code: postageDetails.address?.postCode || "",
      order_id: mainId,
      position_item_ids: (postageDetails.items || [])
        .flatMap((item) => item.positionItemId)
        .filter(Boolean),
    };

    uploadOttoTracking(payload, {
      onSuccess: () => {
        updateShipmentOrders({
          id: postageDetails.id,
          data: {
            trackingUploadStatus: "SUCCESS",
          },
        });
      },
      onError: () => {
        updateShipmentOrders({
          id: postageDetails.id,
          data: {
            trackingUploadStatus: "FAILED",
          },
        });
      },
    });
  }

  async function handleEbayUpload() {
    const mainId = postageDetails.marketplaceOrderId;
    await uploadEbayTracking(mainId);

    updateShipmentOrders({
      id: postageDetails.id,
      data: {
        trackingUploadStatus: "SUCCESS",
      },
    });

    const merged = postageDetails.mergedOrderIds || [];
    const others = merged.filter((id) => id && id !== mainId);

    if (others.length) {
      await Promise.allSettled(others.map((id) => uploadEbayTracking(id)));
    }
  }

  async function onUploadClickHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();

    if (marketplace?.toLowerCase() === "otto") {
      handleOttoUpload();
    } else {
      await handleEbayUpload();
    }
  }

  return (
    <Button
      className="w-32 disabled:cursor-pointer disabled:opacity-50"
      size="sm"
      onClick={onUploadClickHandler}
      disabled={isUpdating || isLoading || isOttoLoading || !shippingCode}
    >
      {isLoading || isUpdating || isOttoLoading ? (
        <Loader className="w-4 animate-spin" />
      ) : (
        "Upload Tracking"
      )}
    </Button>
  );
}
