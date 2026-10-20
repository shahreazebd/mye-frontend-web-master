import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";
import type {
  InventorySync,
  OrderSync,
} from "@/components/settings/all-channels/all-channels-wrapper";

const channelInventorySync = (payload: InventorySync | OrderSync | undefined) => {
  return fetch.put(`/integration/api/v1/channel/update-sync-inventory/`, payload);
};

export default function useChannelInventorySync() {
  const queryClient = useQueryClient();

  return useMutation(channelInventorySync, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
      openSuccessNotification({ description: "Successfully Updated!" });
    },
    onError: () => {
      openErrorNotification({ description: "Something went wrong" });
    },
  });
}
