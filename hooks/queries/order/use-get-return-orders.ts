import { useReturnOrderFilterAtom } from "@/atoms/return-order-atom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import type { ReturnOrderResponse } from "@/types/return-order";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function getReturnOrderList({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    string | undefined,
    {
      sku: string;
      returnId: string;
      orderId: string;
      channelUid: string;
      trackingId: string;
      startDate: string;
      endDate: string;
    }
  ]
>) {
  const [, companyUid, filters] = queryKey;

  return fetch
    .request<ReturnOrderResponse>({
      method: "GET",
      url: `/orders/api/v1/orders/returns`,
      params: {
        company_uid: companyUid,
        channel_uid: filters.channelUid,
        start_date: filters.startDate,
        end_date: filters.endDate,
        // order_id: filter.orderId,
        // return_id: filter.returnId,
        // sku: filter.sku,
        // tracking_id: filter.trackingId,
      },
    })
    .then((res) => res.data.data);
}

export function useGetReturnOrders() {
  const { filter } = useReturnOrderFilterAtom();

  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["get-return-orders", userInformation?.company_uid, filter],
    queryFn: getReturnOrderList,
    retry: 0,
    enabled: !!userInformation?.company_uid,
  });
}
