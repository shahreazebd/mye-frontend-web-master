import { OpenOrderResponse } from "@/schema/open-order";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

function getPendingOrders({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>) {
  const [, , channelId, companyUuid] = queryKey;

  const url = `/orders/api/v1/orders/get-all-channel-orders/${companyUuid}/`;

  const params = {
    dispatch_status: "PENDING",
    channel_uid: channelId === "all" ? "" : channelId,
  };

  return fetch.get<OpenOrderResponse>(url, { params }).then((res) => res.data.data);
}

export function useGetPendingOrders(channelId: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["order", "pending", channelId, userInformation?.company_uid as string],
    queryFn: getPendingOrders,
    enabled: !!channelId || !!userInformation?.company_uid,
  });
}
