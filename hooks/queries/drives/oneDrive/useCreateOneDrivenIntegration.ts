import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useCreateOneDrivenIntegration() {
  return useMutation(
    (payload: any) => {
      return fetch.post("/onedrive/api/v1/onedrive/create-integration/", payload);
    },
    {
      onSuccess: () => {
        openSuccessNotification({ description: "Successfully Integrated" });
      },
      onError: () => {
        openErrorNotification({ description: "Integration failed" });
      },
    }
  );
}
