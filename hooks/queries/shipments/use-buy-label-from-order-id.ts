import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useBuyLabelFromOrderId() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => fetchPostage.post(`/orders/${orderId}/buy`),
    onSuccess: () => {
      openSuccessNotification({
        description: "Label purchase initiated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-shipments"] });
      queryClient.invalidateQueries({ queryKey: ["get-shipment-by-id"] });
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
