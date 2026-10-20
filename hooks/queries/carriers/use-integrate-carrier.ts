import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useIntegrateCarrier() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["carrier", "integrate"],
    mutationFn: (payload: any) => {
      return fetch.post(
        "/integration/api/v1/shipping-carrier/create-shipping-carrier/",
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-carriers"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-shipping-carrier-data"] });

      toast({
        title: "Account Integrated",
        // description: "Successfully Updated!",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.details?.data || error.message,
          variant: "destructive",
        });
      }
    },
  });
}
