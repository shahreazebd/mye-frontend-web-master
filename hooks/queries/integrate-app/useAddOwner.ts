import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

const addOwner = (payload: any) => {
  return fetch.post(
    "/companion/mye-companion/api/v1/companion/create-verification/",
    payload
  );
};

export default function useAddOwner() {
  return useMutation(addOwner, {
    onSuccess: () => {
      window.location.href = "/settings/verify-owner";
      openSuccessNotification({ description: "Check your email" });
    },
    onError: (error: any) => {
      if (error?.response) {
        openErrorNotification({ description: error.response?.data?.message });
      } else if (error?.request) {
        openErrorNotification({ description: "Cannot connect to the server" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
