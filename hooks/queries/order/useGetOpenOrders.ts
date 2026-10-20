import { OpenOrderResponse } from "@/schema/open-order";
import { findDuplicate } from "@/utils/helpers";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchOrdersTableData = ({ queryKey }: QueryFunctionContext) => {
  const [, channelId, company_uid] = queryKey;
  let url = "";

  if (channelId === "all") {
    url = `/orders/api/v1/orders/get-all-channel-open-orders/${company_uid}/`;
  } else {
    url = `/orders/api/v1/orders/open-orders/${company_uid}/${channelId}/`;
  }

  return fetch.get<OpenOrderResponse>(url).then((res) => res.data.data);
};

export default function useGetOpenOrders(uuid: string) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-orders-data", uuid, userInformation?.company_uid],
    fetchOrdersTableData,
    {
      enabled: !!uuid && !!userInformation?.company_uid,
      refetchOnWindowFocus: false,
      select: (data) => {
        return data.map((e) => ({
          ...e,
          duplicate: findDuplicate(data, e.channel_order_id),
        }));
      },
    }
  );
}
