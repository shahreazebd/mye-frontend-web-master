import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const fetcher = (payload: any) => {
  return fetch.post("/api/v1/stores/", payload);
};

export function useCreateChannel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
      toast({
        title: "Success",
        description: "Successfully Integrated!",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    },
  });
}
