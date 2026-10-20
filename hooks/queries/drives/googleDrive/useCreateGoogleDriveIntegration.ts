import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useCreateGoogleDriveIntegration() {
  return useMutation(
    (payload: any) => {
      return fetch.post(`/googledrive/api/v1/drive/create-integration/`, payload);
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
