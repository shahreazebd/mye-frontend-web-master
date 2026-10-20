import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useCreateEvriShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-shipments"],
    mutationFn: (payload: any) => fetchPostage.post("/evri/shipments", payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-shipments"] });
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
