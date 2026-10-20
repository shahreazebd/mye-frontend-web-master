import mappingAtom from "@/atoms/mappingAtom";
import { useUnlinkAlertStatus } from "@/atoms/remoteProductsAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { useToast } from "@/components/ui/use-toast";

export default function useUnlinkProduct() {
  const queryClient = useQueryClient();
  const [mapping] = useAtom(mappingAtom);
  const { toast } = useToast();
  const { userInformation } = useAuth();

  const { setIsUnlinkAlertOpen } = useUnlinkAlertStatus();

  return useMutation({
    mutationFn: (id: string) => {
      return fetch.delete(
        `/miams/api/v1/mapping/delete/${id}/${userInformation?.company_uid}/${mapping?.channelUUid}/`
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries([
        "remote-product-mapping-data",
        mapping?.channelUUid,
      ]);
      toast({
        description: "Mapping deleted successfully",
        title: "Success",
      });
    },

    onError: (error) => {
      if (error instanceof XiorError) {
        if (error.response?.status === 409) {
          setIsUnlinkAlertOpen({
            description: error.response?.data.message,
            isOpen: true,
          });

          return;
        }

        toast({
          title: "Error",
          description: JSON.stringify(error.response?.data?.details),
          variant: "destructive",
        });
      }
    },
  });
}
