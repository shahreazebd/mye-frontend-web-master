import { CreateProductPayload } from "@/schema/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

function fetcher(newProduct: CreateProductPayload[]) {
  return fetch.post("/miams/api/v1/mapping/product/local-product/add/", newProduct);
}

export default function useCreateManyProducts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(fetcher, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      toast({
        title: "Success",
        description: res.data.message,
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Please try again",
          variant: "destructive",
        });
      }
    },
  });
}
