import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useDeleteRateByBatchId() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (batchId: string) => {
      return fetchPostage.delete(`/amazon/rates/${batchId}/`);
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
