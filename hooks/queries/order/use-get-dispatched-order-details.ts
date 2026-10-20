import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import type { DispatchedOrderDetailsResponse } from "@/types/dispatched-order";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function fetchDispatchOrder({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) {
  const [, companyUid, dispatchId] = queryKey;

  const url = `/orders/api/v1/orders/get-dispatched-batch/${companyUid}/${dispatchId}/`;
  return fetch.get<DispatchedOrderDetailsResponse>(url).then((res) => res.data.data);
}

export default function useGetDispatchOrderDetails(dispatchId: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: [
      "get-dispatched-order-details",
      userInformation?.company_uid as string,
      dispatchId,
    ],
    queryFn: fetchDispatchOrder,
    enabled: !!dispatchId,
  });
}
