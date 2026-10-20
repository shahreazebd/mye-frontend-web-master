import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type RestoreCancelledOrderParams = {
  channelId: string;
  channelOrderId: string;
};

function restoreCancelledOrder({
  channelId,
  channelOrderId,
}: RestoreCancelledOrderParams) {
  return fetch.post(
    `/orders/api/v1/orders/restore-cancelled-order/${channelId}/${channelOrderId}/`
  );
}

export default function useRestoreCancelledOrder() {
  const queryClient = useQueryClient();

  return useMutation(restoreCancelledOrder, {
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(["fetch-cancel-orders-data"]);
      queryClient.invalidateQueries(["fetch-orders-data"]);
      queryClient.invalidateQueries(["order"]);
      toast({
        title: "Success!",
        description: response?.data?.message || "Order restored successfully",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to restore order",
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
