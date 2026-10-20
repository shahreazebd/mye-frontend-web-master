import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type Payload = {
  data: string[];
  channelUid: string;
  companyUuid: string;
};

const mutationFn = (payload: Payload) => {
  return fetch.post(
    `/miams/api/v1/mapping/bulk-delete-mapping/${payload.companyUuid}/${payload.channelUid}`,
    payload.data
  );
};

export default function useCSVUnmapping() {
  const queryClient = useQueryClient();

  const channelUid = useParams().channel_uid as string;

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["remote-product-mapping-data", channelUid]);
      queryClient.invalidateQueries(["fetch-local-product"]);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    },
  });
}
