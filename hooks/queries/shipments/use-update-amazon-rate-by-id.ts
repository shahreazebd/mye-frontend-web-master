import { openErrorNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

function updateAmazonRateById(data: any) {
  return fetchPostage.post(`/amazon/rates/${data.batchId}`, data.body);
}

export function useUpdateAmazonRateById() {
  return useMutation({
    mutationKey: ["update-amazon-rate-by-id"],
    mutationFn: updateAmazonRateById,
    onSuccess: () => {
      // openSuccessNotification({ description: res. });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      }
    },
  });
}
