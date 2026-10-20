import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

interface Payload {
  company_uid: string;
  parent_product: string;
  composite_child_product: {
    child_product_id: number;
    quantity: number;
  }[];
}

const addProductWithComposite = (payload: Payload) => {
  return fetch.post(
    "/miams/api/v1/mapping/product/local-product/create-composite/",
    payload
  );
};

export default function useExistingProductComposite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(addProductWithComposite, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      toast({
        title: "Composite product created!",
        description: res?.data?.message || "Successfully Created!",
      });
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
