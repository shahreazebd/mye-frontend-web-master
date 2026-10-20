import { openErrorNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useBuyShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentId: string) => fetchPostage.post(`/shipments/${shipmentId}/buy`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-shipments"] });
      // openSuccessNotification({ description: res.data?.message });
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
