import { usePostageAtom } from "@/atoms/postageAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { toast } from "@/components/ui/use-toast";

export type Payload = {
  channelUuid: string;
  companyUuid: string;
  batchID: string;
  zpl: string[];
};

function generateAmazonLabels(payload: Payload) {
  return fetch
    .post("/amazon/api/v1/shipping/lebel-generate/", payload)
    .then((res) => res.data);
}

export function useGenerateAmazonLabels() {
  const queryClient = useQueryClient();

  const { userInformation } = useAuth();

  const { postageInfo } = usePostageAtom();

  return useMutation({
    mutationKey: ["generate-amazon-labels"],
    mutationFn: generateAmazonLabels,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "get-postages",
          userInformation?.company_uid as string,
          postageInfo.filters,
        ],
      });

      toast({
        title: "Success",
        description: "Successfully regenerated",
      });
    },
    onError: (error) => {
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
