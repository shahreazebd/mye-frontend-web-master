import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useDeleteShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentId: string) => fetchPostage.delete(`/shipments/${shipmentId}`),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-shipments"] });
      openSuccessNotification({
        description: res.data?.message || "Shipment deleted successfully!",
      });
    },
    onError: (error) => {
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
