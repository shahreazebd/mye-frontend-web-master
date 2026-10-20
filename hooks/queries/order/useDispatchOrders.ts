import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { toast } from "@/components/ui/use-toast";

const mutateDispatch = (data: any) => {
  return fetch.post("/orders/api/v1/orders/open-orders/dispatch/", data);
};

export default function useDispatchOrders(channelId: string) {
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();

  return useMutation(mutateDispatch, {
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
    onSuccess: () => {
      queryClient.invalidateQueries([
        "fetch-orders-data",
        channelId,
        userInformation?.company_uid,
      ]);
      toast({
        title: "Success!",
        description: "Orders dispatched successfully",
      });
    },
  });
}
