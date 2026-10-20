import { useOpenOrderPaginationAtom } from "@/atoms/openOrderAtom";
import { findDuplicate } from "@/utils/helpers";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import { DispatchOrdersResponse } from "@/types/dispatch-order";
import fetch from "@/config/xior";

const fn = ({
  queryKey,
}: QueryFunctionContext<[string, string, string, number, number]>) => {
  const [, channelId, company_uid, page, limit] = queryKey;
  let url = "/orders/api/v1/orders/paginated-orders/";

  const params = {
    dispatch_status: "DISPATCHED",
    channel_uid: channelId,
    company_uid: company_uid,
    page: page,
    limit,
  };

  return fetch
    .get<DispatchOrdersResponse>(url, {
      params,
    })
    .then((res) => {
      return res.data;
    });
};

export default function useGetAllDispatchedOrder(uuid: string) {
  const { userInformation } = useAuth();
  const { pagination } = useOpenOrderPaginationAtom();

  return useQuery(
    [
      "fetch-dispatch-data",
      uuid,
      userInformation?.company_uid ?? "",
      pagination.pageIndex,
      pagination.pageSize,
    ] as [string, string, string, number, number],
    fn,
    {
      enabled: !!userInformation?.company_uid,
      refetchOnWindowFocus: false,
      select: (data) => {
        return {
          ...data,
          data: data.data.map((e) => ({
            ...e,
            duplicate: findDuplicate(data.data, e.channel_order_id),
          })),
        };
      },
    }
  );
}
