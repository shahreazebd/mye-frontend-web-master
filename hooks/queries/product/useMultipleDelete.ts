// utils
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

interface Payload {
  company_uid: string;
  product_ids: number[];
}

const deleteProduct = (payload: Payload) => {
  return fetch.put(
    "/miams/api/v1/mapping/product/local-product/delete-multiple-local-product/",
    payload
  );
};

export default function useMultipleDelete() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      toast({
        title: "Delete product successfully",
        description: "You have successfully deleted the products",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: JSON.stringify(
            error.response?.data?.details?.data || error.message
          ),
          variant: "destructive",
        });
      } else if (error instanceof Error)
        toast({ title: "Error", description: error.message, variant: "destructive" });
      else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
