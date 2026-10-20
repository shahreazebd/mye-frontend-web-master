import { openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

type Payload = {
  indentifier: {
    company_uuid: string | undefined;
    id: number;
    sku: string;
  };
  data: any;
};

function fn(payload: Payload) {
  const url = `/miams/api/v1/mapping/product/local-product/update/${payload.indentifier.id}/${payload.indentifier.sku}/${payload.indentifier.company_uuid}/`;
  return fetch.patch(url, payload.data);
}

export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      queryClient.invalidateQueries(["fetch-product-details"]);

      openSuccessNotification({ description: "Product Updated!" });

      toast({
        title: "Product Updated",
        description: "Successfully Updated!",
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
