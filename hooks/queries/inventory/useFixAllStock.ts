// utils
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";

const fixStock = (stock: any) => {
  return fetch.post("/miams/api/v1/stock/single-channel-stock-fix-all/", stock);
};

export default function useFixAllStock() {
  return useMutation(fixStock, {
    onSuccess: () => {
      openSuccessNotification({ description: "Stock Fixed" });
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
