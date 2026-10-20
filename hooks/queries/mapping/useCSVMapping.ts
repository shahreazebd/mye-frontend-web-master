import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const csvMapping = (payload: any) => {
  return fetch.post("/miams/api/v1/mapping/create-csv-mapping/", payload);
};

export default function useCSVMapping(channelUid: string) {
  const queryClient = useQueryClient();

  return useMutation(csvMapping, {
    onSuccess: () => {
      queryClient.invalidateQueries(["remote-product-mapping-data", channelUid]);
      queryClient.invalidateQueries(["fetch-local-product"]);
      openSuccessNotification({ description: "Successfully Mapped." });
    },
    onError: (error: any) => {
      openErrorNotification({ description: error.response?.data?.message });
    },
  });
}
