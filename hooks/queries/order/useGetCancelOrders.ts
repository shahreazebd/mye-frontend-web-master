// https://api.manageyourecommerce.com/orders/api/v1/orders/get-cancelled-order?company_uid=95002bb0-d182-4b1e-aa80-94080d4befc6
import { CancelledOrdersResponse } from "@/schema/open-order";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchOrdersTableData = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid, channelId, date] = queryKey;
  let url = `/orders/api/v1/orders/get-cancelled-order`;

  return fetch
    .get<CancelledOrdersResponse>(url, {
      params: {
        company_uid: companyUid,
        channel_uid: channelId || "all",
        start_date: date,
        end_date: date,
      },
    })
    .then((res) => res.data.data);
};

export default function useGetCancelOrders(date: string, channelUid: string) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-cancel-orders-data", userInformation?.company_uid, channelUid, date],
    fetchOrdersTableData,
    {
      enabled: !!channelUid || !!userInformation?.company_uid,
    }
  );
}
