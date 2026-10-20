import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

const verifyOwner = (payload: any) => {
  return fetch.post("/companion/mye-companion/api/v1/companion/verify-owner/", payload);
};

export default function useVerifyOwner() {
  return useMutation(verifyOwner, {
    onSuccess: () => {
      openSuccessNotification({ description: "Owner added successfully" });
      window.location.href = "/settings/integrate-app";
    },
    onError: (error: any) => {
      if (error?.response) {
        if (error?.response?.status === 500) {
          openErrorNotification({ description: "Network Error" });
        }
        if (error?.response?.status === 400) {
          openErrorNotification({
            description: error?.response?.data?.message,
          });
        }
      } else if (error?.request) {
        openErrorNotification({ description: "Request error" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
