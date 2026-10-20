import productsAtom from "@/atoms/productsAtom";
import type { UpdateProductPayload } from "@/schema/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const fetcher = (payload: UpdateProductPayload) => {
  const url = "/miams/api/v1/mapping/product/local-product/update-local-products/";
  return fetch.put(url, payload);
};

export default function useUpdateSku() {
  const [, setProduct] = useAtom(productsAtom);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      toast({
        title: "Product Updated",
        description: "Successfully Updated!",
      });

      setProduct((prev) => ({
        ...prev,
        isMultipleProductEditSheet: false,
      }));
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description:
            JSON.stringify(error.response?.data?.details?.data) || error.message,
        });
      }
    },
  });
}
