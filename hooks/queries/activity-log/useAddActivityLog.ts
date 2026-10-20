import { openErrorNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { evidentApi } from "@/config/xior";

const addActivityLog = (payload: any) => {
  return evidentApi.post("/notification/evd-alert/api/v1/notification/create/", payload);
};

export default function useAddActivityLog() {
  const queryClient = useQueryClient();

  return useMutation(addActivityLog, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-activity-logs"]);
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          openErrorNotification({ description: "Network Error" });
        }

        if (error.response.status === 400) {
          openErrorNotification({ description: error.response.data.message });
        }
      } else if (error.request) {
        openErrorNotification({ description: "Request error" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
