import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

export function useGetRoyalMailReturnServices() {
  return useQuery({
    queryKey: ["royal-mail", "return-services"],
    queryFn: () => ({
      services: [
        { serviceCode: "Tracked24Return", name: "Royal Mail Tracked 24 Return" },
        { serviceCode: "Tracked48Return", name: "Royal Mail Tracked 48 Return" },
      ],
    }),
  });
}

export function useBuyReturnShipment(carrier: string) {
  const queryClient = useQueryClient();
  const carrierPath = carrier.toLowerCase().replace("_", "-");

  return useMutation({
    mutationFn: (payload: any) => fetchPostage.post(`/${carrierPath}/returns`, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["get-postage-orders"] });
      queryClient.invalidateQueries({ queryKey: ["get-shipment-orders"] });
      openSuccessNotification({
        description: res.data?.message || "Return shipment purchased successfully",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      } else {
        openErrorNotification({
          description: "An error occurred while buying return shipment",
        });
      }
    },
  });
}
