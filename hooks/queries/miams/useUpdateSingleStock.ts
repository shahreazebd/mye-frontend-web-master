import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useUpdateSingleStock() {
  return useMutation(
    (updateStock: any) => {
      return fetch.put(`/miams/api/v1/stock/single-stock/update/`, updateStock);
    },
    {
      onSuccess: () => {
        openSuccessNotification({ description: "Successfully Updated!" });
      },
      onError: (error: any) => {
        openErrorNotification({ description: error.response.data.message });
      },
    }
  );
}
