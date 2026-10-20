import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const channelOrderSync = (payload: any) => {
  return fetch.put(`/integration/api/v1/channel/update-sync-order/`, payload);
};

export default function useChannelOrderSync() {
  const queryClient = useQueryClient();

  return useMutation(channelOrderSync, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
      openSuccessNotification({ description: "Successfully Updated!" });
    },
    onError: () => {
      openErrorNotification({ description: "Something went wrong" });
    },
  });
}
