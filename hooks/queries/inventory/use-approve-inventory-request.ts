import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

// configs
import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

type Payload = {
  company_uid: string;
  uuid: string;
  status: string;
};

function fn(stock: Payload) {
  return fetch.put("/miams/api/v1/stock/approve-inventory-stock-request/", stock);
}

export default function useApproveInventoryRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory-stock-request"]);
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        if (error.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Check your internet or Server is down!",
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
