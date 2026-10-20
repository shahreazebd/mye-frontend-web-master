import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useCreateDropboxIntegration() {
  return useMutation(
    (payload: any) => {
      return fetch.post(`/dropbox/api/v1/dropbox/create-integration/`, payload);
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
