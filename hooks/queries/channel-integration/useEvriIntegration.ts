import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

const fetcher = (payload: any) => {
  return fetch.post("/evri/api/v1/auth/create-token/", payload);
};

export default function useEvriIntegration() {
  return useMutation(fetcher, {
    onSuccess: () => {
      openSuccessNotification({ description: "Successfully Updated!" });
    },
    onError: () => {
      openErrorNotification({ description: "Something went wrong" });
    },
  });
}
