import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const fetcher = (payload: any) => {
  return fetch.post(`/integration/api/v1/channel/reauth-channel/ebay/`, payload);
};

export default function useEbayReconnect() {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
    },
  });
}
