import { openErrorNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

function updateShipmentOrders(payload: {
  id: string;
  data: { trackingUploadStatus: "SUCCESS" | "FAILED" };
}) {
  return fetchPostage.patch(`/orders/${payload.id}`, payload.data);
}

export function useUpdateShipmentOrders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["shipments", "update-shipment-orders"],
    mutationFn: updateShipmentOrders,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-shipment-by-id"] });
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
