import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

interface UpdateChannelPayload {
  data: {
    channel_type: string | undefined;
    channel_state: string | undefined;
    country: string;
    name: string;
    channel_max_stock: number;
    max_pending_order_days: number;
    location_id: string;
    report_sorted_by?: string | undefined;
  };
  uuid: string | undefined;
  company_uid: string | undefined;
}

export default function useUpdateChannel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (payload: UpdateChannelPayload) => {
      return fetch.put(
        `/integration/api/v1/channel/update-channel/${payload?.company_uid}/${payload?.uuid}/`,
        payload?.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-channels"]);
        toast({
          title: "Account updated.",
          description: "Successfully Updated!",
        });
      },
      onError: (error: unknown) => {
        if (error instanceof XiorError) {
          toast({
            title: "Error",
            description: error.response?.data?.details?.data || error.message,
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
    }
  );
}
