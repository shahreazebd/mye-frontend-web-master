import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useAmazonBulkShippingRates() {
  return useMutation({
    mutationKey: ["create-shipments"],
    mutationFn: (payload: any) => fetchPostage.post("/amazon/rates/bulk/new", payload),
    onSuccess: (res) => {
      openSuccessNotification({ description: res.data?.message });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      }
    },
  });
}
