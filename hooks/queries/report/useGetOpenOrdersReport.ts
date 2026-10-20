import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchOpenOrdersReport = (channelId: any, company_uid: any) => {
  return fetch.get(
    `/reports/mye-report/api/v1/order/open-order/create/${company_uid}/${channelId}/`
  );
};

export default function useGetOpenOrdersReport(channelId: any = "") {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-open-orders-data", channelId],
    () => fetchOpenOrdersReport(channelId, userInformation?.company_uid),
    {
      enabled: !!channelId && !!userInformation?.company_uid,
    }
  );
}
