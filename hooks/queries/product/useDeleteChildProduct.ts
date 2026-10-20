// utils
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

export interface deleteCompositeProductPayload {
  parent_product_id: number;
  child_product_id: number;
  company_uid: string;
}

const deleteProduct = ({
  parent_product_id,
  child_product_id,
  company_uid,
}: deleteCompositeProductPayload) => {
  return fetch.delete(
    `/miams/api/v1/mapping/product/local-product/delete-composite-child-v2/${company_uid}/${parent_product_id}/${child_product_id}/`
  );
};

export default function useDeleteChildProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(deleteProduct, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["fetch-composite-products"]);
      toast({
        title: "Child Product Deleted",
        description: res?.data?.message || "Successfully Deleted!",
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
