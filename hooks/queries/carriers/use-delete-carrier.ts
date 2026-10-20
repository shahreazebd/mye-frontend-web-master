import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useDeleteCarrier() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["carrier-delete"],
    mutationFn: (payload: string) => {
      return fetch.delete(`/integration/api/v1/shipping-carrier/${payload}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-carriers"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-shipping-carrier-data"] });

      toast({ title: "Account Deleted" });
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
