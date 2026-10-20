import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type UploadTrackingPayload = {
  channelUid: string;
  orders: {
    orderId: string;
    shippingCarrierCode: string;
    trackingNumber: string;
    lineItems: {
      quantity: number;
      lineItemId: string;
    }[];
  }[];
};

const mutate = (data: UploadTrackingPayload) => {
  return fetch.post("/ebay/api/v1/orders/complete-sale", data);
};

export function usePostUploadTracking() {
  return useMutation({
    mutationFn: mutate,

    onError: (error: unknown) => {
      console.log(error);
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        });
      } else if (error instanceof Error)
        toast({ title: "Error", description: error.message, variant: "destructive" });
      else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
