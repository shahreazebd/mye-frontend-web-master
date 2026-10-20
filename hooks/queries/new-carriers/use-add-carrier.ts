import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export function useAddCarrier() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["carrier", "add"],
    mutationFn: (payload: any) => {
      return fetchPostage.post("/carriers", payload).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data?.redirectURI) {
        window.location.href = data.redirectURI;
      }

      queryClient.invalidateQueries({ queryKey: ["carrier", "list"] });

      toast({
        title: "Carrier Added",
        description: "Successfully Added!",
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
