import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { InventoryRequestHistoryResponse } from "@/types/inventory-request-history";
import fetch from "@/config/xior";

type Props = { channelUid: string; remoteProductSku: string };

const getRequestHistory = ({ queryKey }: QueryFunctionContext) => {
  const [, channelUid, remoteProductSku] = queryKey;
  return fetch
    .get<InventoryRequestHistoryResponse>(
      `/integration/api/v1/channel/inventory-request-history/${channelUid}/${remoteProductSku}`
    )
    .then((res) => res?.data?.data);
};

export function useGetRequestHistory(requestHistoryParams: Props) {
  return useQuery({
    queryKey: [
      "get-request-history",
      requestHistoryParams.channelUid,
      requestHistoryParams.remoteProductSku,
    ],
    queryFn: getRequestHistory,
    enabled: !!requestHistoryParams.channelUid && !!requestHistoryParams.remoteProductSku,
  });
}
