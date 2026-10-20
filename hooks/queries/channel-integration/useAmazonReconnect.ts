import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const fetcher = (payload: any) => {
  return fetch.post("/amazon/api/v1/auth/reauthorize/channel", payload);
};

export default function useAmazonReconnect() {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
    },
  });
}
