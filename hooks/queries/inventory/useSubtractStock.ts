import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const updateStock = (stock: any) => {
  return fetch.put("/miams/api/v1/stock/stock-substract/", stock);
};

export default function useSubtractStock() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(updateStock, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-inventory-data"]);

      toast({
        title: "Success",
        description: "Stock Subtracted!",
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
        }
        toast({
          title: "Error",
          description: "error response : " + error.response.status,
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Error",
          description: "Cannot connect to the server",
          variant: "destructive",
        });
      }
    },
  });
}
