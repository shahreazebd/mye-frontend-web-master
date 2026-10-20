import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "hooks/custom/useAuth";
import { DateRange } from "react-day-picker";

import fetch from "@/config/xior";

import { useGetStockHistoryCountByType } from "../inventory/use-get-stock-history-count-by-type";

const fetchSalesReport = ({ queryKey }: QueryFunctionContext) => {
  const [, startDate, endDate, channelUid, company_uid] = queryKey;

  const params: any = {
    start_date: startDate,
    end_date: endDate,
  };

  if (channelUid) {
    params.channel_uid = channelUid;
  }

  return fetch
    .get(`/orders/api/v1/orders/order-sales-report/${company_uid}/`, {
      params: params,
    })
    .then((res) => res.data.data);
};

export default function useGetSalesReport(
  date: DateRange | undefined,
  channelUid: string
) {
  const { userInformation } = useAuth();

  const { from, to } = date || {};
  const fromDate = from ? format(from, "yyyy-MM-dd") : "";
  const toDate = to ? format(to, "yyyy-MM-dd") : "";

  const { data: returnStockHistory, isLoading } = useGetStockHistoryCountByType({
    company_uid: userInformation?.company_uid as string,
    location_id: 3,
    filter_type: "RETURN",
  });

  return useQuery({
    queryKey: [
      "get-sales-report",
      fromDate,
      toDate,
      channelUid,
      userInformation?.company_uid,
    ],
    queryFn: fetchSalesReport,
    enabled: !isLoading,
    select: (data) => {
      return data.map((e: any) => ({
        ...e,
        return_quantity: returnStockHistory?.[e.local_sku] || 0,
      }));
    },
  });
}
