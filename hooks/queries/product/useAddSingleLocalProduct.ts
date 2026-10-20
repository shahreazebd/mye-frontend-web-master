// utils
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

const addProduct = (newProduct: any) => {
  return fetch.post(
    "/miams/api/v1/mapping/product/local-product/add-single-local-v2/",
    newProduct
  );
};

export default function useAddSingleLocalProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      toast({
        title: "Product added successfully",
        description: "Product added successfully",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        console.log(error.response?.data.message);

        toast({
          title: "Error",
          description: error.response?.data?.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
