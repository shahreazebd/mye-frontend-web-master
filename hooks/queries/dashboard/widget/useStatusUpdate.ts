import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useStatusUpdate() {
  return useMutation(
    (payload) => {
      const URL = "/dashboard/mye-dashboard/api/v1/widget/status-update/";
      return fetch.put(URL, payload);
    },
    {
      onSuccess: ({ data }) => {
        openSuccessNotification(data.message);
      },
      onError: () => {
        openErrorNotification({ description: "Something went wrong" });
      },
    }
  );
}
