import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";

export interface OttoTrackingUploadPayload {
  channel_uid: string;
  carrier: string;
  tracking_number: string;
  return_tracking_number: string;
  city: string;
  country_code: string;
  zip_code: string;
  order_id: string;
  position_item_ids: string[];
}

export async function ottoTrackingUpload(payload: OttoTrackingUploadPayload) {
  return fetch.post("/otto/api/v1/orders/shipment-tracking", payload);
}

export function useOttoTrackingUpload() {
  return useMutation({
    mutationFn: ottoTrackingUpload,
    onSuccess: (res) => {
      openSuccessNotification({
        description: res.data?.message || "Tracking uploaded successfully",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        openErrorNotification({ description: error.message });
      } else {
        openErrorNotification({ description: "Something went wrong" });
      }
    },
  });
}
