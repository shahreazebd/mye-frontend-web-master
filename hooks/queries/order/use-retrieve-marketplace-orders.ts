import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { toast } from "@/components/ui/use-toast";

interface RetrieveMarketplaceOrdersPayload {
  channelUid: string;
  channelType: string;
  daysAgo?: number;
  hour?: number;
}

function retrieveMarketplaceOrdersApi({
  channelUid,
  channelType,
  daysAgo,
  hour,
}: RetrieveMarketplaceOrdersPayload) {
  const params: Record<string, any> = {
    channel_type: channelType.toUpperCase(),
  };

  if (["AMAZON", "EBAY"].includes(channelType.toUpperCase())) {
    if (hour !== undefined) {
      params.hour = hour;
    }
  } else {
    if (daysAgo !== undefined) {
      params.days_ago = daysAgo;
    }
  }

  return fetch.get(`/orders/api/v1/orders/fetch-marketplace-orders/${channelUid}`, {
    params,
  });
}

export function useRetrieveMarketplaceOrders(channelId: string) {
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();

  return useMutation({
    mutationKey: ["retrieve-marketplace-orders"],
    mutationFn: retrieveMarketplaceOrdersApi,
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to retrieve orders",
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries([
        "fetch-orders-data",
        channelId,
        userInformation?.company_uid,
      ]);
      toast({
        title: "Success",
        description:
          res.data?.message || "Order retrieval request has been submitted successfully.",
      });
    },
  });
}
