// utils
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";

const deleteOrphanProduct = (payload: any) => {
  const URI =
    "/miams/api/v1/mapping/product/remote-product/delete-multiple-remote-product/";

  return fetch.delete(URI, {
    data: payload,
  });
};

export default function useDeleteOrphanProducts(channelUid: any) {
  const queryClient = useQueryClient();

  return useMutation(deleteOrphanProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-orphan-products", channelUid]);
      openSuccessNotification({ description: `Successfully Deleted!` });
    },
    onError: (error: any) => {
      openErrorNotification({ description: error?.response?.data?.message });
    },
  });
}
