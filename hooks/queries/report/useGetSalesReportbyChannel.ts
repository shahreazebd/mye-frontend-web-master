import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const salesReportbyChannel = ({ startDate, endDate, channelUid, company_uid }: any) => {
  const URL = `/reports/api/v1/order/dispatch-order/create?company_uid=${company_uid}&channel_uid=${channelUid}&start_date=${startDate}&end_date=${endDate}`;
  return fetch.get(URL);
};

export default function useGetSalesReportbyChannel(
  startDate: any,
  endDate: any,
  channelUid: any
) {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-single-order-report", startDate, endDate, channelUid],
    () =>
      salesReportbyChannel({
        startDate,
        endDate,
        channelUid,
        company_uid: userInformation?.company_uid,
      }),
    {
      enabled: !!startDate && !!endDate && !!channelUid && !!userInformation?.company_uid,
    }
  );
}
