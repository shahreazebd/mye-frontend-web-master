import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

const cancelOrder = (data: any) => {
  return fetch.post("/orders/api/v1/orders/open-orders/cancel-order/", data);
};

export default function useCancelOrders(channelId: any) {
  const queryClient = useQueryClient();

  return useMutation(cancelOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-orders-data", channelId]);
      queryClient.invalidateQueries(["order", "pending"]);
      toast({
        title: "Success!",
        description: "Orders Canceled successfully",
      });
    },
    onError: (error: unknown) => {
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
