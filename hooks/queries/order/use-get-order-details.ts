import type { OpenOrderDetailsResponse } from "@/schema/open-order";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

// fetch function
function fetchOrdersTableData({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>) {
  const [, channelId, orderId, company_uid] = queryKey;

  let url = `orders/api/v1/orders/get-order-details?company_uid=${company_uid}&channel_uid=${channelId}&order_id=${orderId}`;

  return fetch.get<OpenOrderDetailsResponse>(url).then((res) => res.data.data);
}

export default function useGetOrderDetails(
  channelId: string,
  orderId: string,
  enable = true
) {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-order-details", channelId, orderId, userInformation?.company_uid as string],
    fetchOrdersTableData,
    {
      enabled: enable && !!channelId && !!orderId && !!userInformation?.company_uid,
    }
  );
}
