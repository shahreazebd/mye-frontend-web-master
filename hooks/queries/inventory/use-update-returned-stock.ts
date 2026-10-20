import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

function updateReturnedStock(stock: any) {
  return fetch.put("/miams/api/v1/stock/return-stock-update/", stock);
}

export default function useUpdateReturnedStock() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateReturnedStock,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-inventory-data"]);

      toast({
        title: "Success",
        description: "Stock returned successfully",
      });
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          toast({
            title: "Error",
            description: "Check your internet or Server is down!",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Error",
          description: "error response : " + error.response.status,
          variant: "destructive",
        });
      }
    },
  });
}
