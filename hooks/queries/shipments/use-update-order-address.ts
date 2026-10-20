import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { Address } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";

function updateOrderAddress(payload: { orderId: string; address: Address }) {
  return fetchPostage.patch(`/orders/${payload.orderId}`, {
    address: payload.address,
  });
}

export function useUpdateOrderAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["shipments", "update-order-address"],
    mutationFn: updateOrderAddress,
    onSuccess: async () => {
      openSuccessNotification({
        description: "Address updated successfully",
      });
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
