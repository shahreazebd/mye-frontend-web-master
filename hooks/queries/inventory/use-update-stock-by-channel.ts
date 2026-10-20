import { useMutation } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type Payload = {
  company_uid: string;
  channel_uid: string;
  body: {
    skus: string[] | [];
  };
};

const updateStock = (payload: Payload) => {
  return fetch.post(
    `/miams/api/v1/mapping/update-stock-by-channel/${payload?.company_uid}/${payload?.channel_uid}`,
    payload?.body
  );
};

export default function useUpdateStockByChannel() {
  return useMutation(updateStock, {
    onSuccess: (res) => {
      toast({
        title: "Success",
        description: res?.data?.data?.meassage,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update stock",
      });
    },
  });
}
