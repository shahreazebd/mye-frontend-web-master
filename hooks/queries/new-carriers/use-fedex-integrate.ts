import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useFedexIntegrate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["carrier", "integrate"],
    mutationFn: (payload: any) => {
      return fetchPostage.post("/carriers", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-carriers-new"] });

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
