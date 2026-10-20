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

function deleteProduct({
  productId,
  companyUid,
}: {
  productId: number;
  companyUid: string;
}) {
  return fetch.delete(
    `/miams/api/v1/mapping/product/local-product/delete/${productId}/${companyUid}/`
  );
}

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["fetch-product-data"] });
      toast({
        title: "Product Deleted",
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
