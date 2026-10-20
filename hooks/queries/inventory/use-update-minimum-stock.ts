// utils
import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const updateMinimumStock = (stock: any) => {
  return fetch.put("/miams/api/v1/stock/update-minimum/", stock);
};

export default function useUpdateMinimumStock(locationId: string) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation(updateMinimumStock, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-inventory-data", locationId]);

      toast({
        title: "Successful",
        description: "Minimum Stock updated!",
      });
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          toast({
            title: "Something went wrong",
            description: "Check your internet or Server is down!",
            variant: "destructive",
          });
        }
      } else if (error.request) {
        toast({
          title: "Something went wrong",
          description: "Cannot connect to the server",
          variant: "destructive",
        });
      }
    },
  });
}
