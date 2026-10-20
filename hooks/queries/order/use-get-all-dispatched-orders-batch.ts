import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { DispatchOrdersResponse } from "@/types/dispatched-order";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function fetchDispatchOrder({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>) {
  const [, companyUid, channelUid, date] = queryKey;

  const params = {
    channel_uid: channelUid === "" ? "" : channelUid,
    start_date: date,
    end_date: date,
  };

  const url = `/orders/api/v1/orders/get-all-dispatched-batch/${companyUid}`;
  return fetch
    .get<DispatchOrdersResponse>(url, {
      params: params,
    })
    .then((res) => res.data.data);
}

export default function useGetAllDispatchOrderBatch(date: string, channelUid: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: [
      "get-dispatched-orders-batch",
      userInformation?.company_uid as string,
      channelUid,
      date,
    ],
    queryFn: fetchDispatchOrder,
    enabled: !!date,
  });
}
