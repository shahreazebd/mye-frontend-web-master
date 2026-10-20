import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

type Payload = {
  company_uid: string;
  data: {
    channel_uid: string;
    remote_product: number;
    sync_inventory: boolean;
  }[];
};

function updateRemoteProduct(payload: Payload) {
  return fetch.post(
    "/miams/api/v1/mapping/product/remote-product/update-multiple-remote-product/",
    payload
  );
}

export default function useUpdateRemoteProduct() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: updateRemoteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["remote-product-mapping-data"]);
      await queryClient.invalidateQueries(["mapping-products"]);

      toast({
        title: "Successful",
        description: "Remote product updated!",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError && error.response) {
        toast({
          title: "Something went wrong",
          description: "",
          variant: "destructive",
        });
      }
    },
  });
}
