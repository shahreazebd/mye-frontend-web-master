import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useDeleteCarrier() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["carrier", "delete"],
    mutationFn: (id: string) => {
      return fetchPostage.delete(`/carriers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carrier", "list"] });

      toast({ title: "Carrier Deleted" });
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
