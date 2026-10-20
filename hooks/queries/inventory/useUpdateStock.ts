// utils
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";

const updateStock = (stock: any) => {
  return fetch.put("/miams/api/v1/stock/update/", stock);
};

export default function useUpdateStock() {
  return useMutation(updateStock, {
    onSuccess: () => {
      openSuccessNotification({ description: "Stock updated" });
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          openErrorNotification({
            description: "Check your internet or Server is down!",
          });
        }
        openErrorNotification({
          description: "error response : " + error.response.status,
        });
      } else if (error.request) {
        openErrorNotification({ description: "Cannot connect to the server" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
