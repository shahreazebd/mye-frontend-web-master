import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

// configs
import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

type Payload = {
  sku: string;
  company_uid: string;
  order_threshold: number;
  location_id: number;
  order_threshold_status: boolean;
};

function setOrderThreshold(payload: Payload) {
  return fetch.put("/miams/api/v1/stock/set-order-threshold/", payload);
}

export default function useSetOrderThreshold() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: setOrderThreshold,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-inventory-data"]);

      toast({
        title: "Success",
        description: "Successfully set daily sells limit",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        if (error.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Check your internet or server is down!",
            variant: "destructive",
          });
        }

        toast({
          title: "Error",
          description: "error response : " + error.response?.status,
          variant: "destructive",
        });
      }
    },
  });
}
