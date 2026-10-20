import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

interface payload {
  channel_uid: string;
  company_uid: string;
  data: {
    remote_product_database_id: number;
    local_product_database_id: number;
  };
}

const addMapping = (mappedData: payload) => {
  return fetch.post("/miams/api/v1/mapping/create/", mappedData);
};

export default function useAddMapping() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(addMapping, {
    onSuccess: () => {
      queryClient.invalidateQueries(["remote-product-mapping-data"]);
      toast({
        description: "Mapping added successfully",
        title: "Success",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
