import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const deleteTracker = (payload: any) => {
  return fetch.post("/order-tracker/api/v1/trackers/delete-ordertrackers/", payload);
};

export default function useDeleteTracker() {
  const queryClient = useQueryClient();

  return useMutation(deleteTracker, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-trackers"]);
      openSuccessNotification({ description: "Successfully Deleted!" });
    },
    onError: (error: any) => {
      if (error?.response) {
        openErrorNotification({ description: error.response?.data?.message });
      }
    },
  });
}
