import { StockReport } from "@/schema/stock-report-schema";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "hooks/custom/useAuth";
import { DateRange } from "react-day-picker";

import fetch from "@/config/xior";

const fetchSalesReport = ({ queryKey }: QueryFunctionContext) => {
  const [, startDate, endDate, channelUid, company_uid] = queryKey;

  return fetch
    .get("/reports/api/v1/order/sales-report/get/", {
      params: {
        company_uid,
        channel_uid: channelUid === "all" ? "" : channelUid,
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then<StockReport[]>((res) => res.data.data);

  // const URL = `reports/api/v1/order/sales-report/get/?company_uid=${company_uid}&channel_uid=${
  //   channelUid === "all" ? "" : channelUid
  // }&start_date=${startDate}&end_date=${endDate}`;
  // return fetch.get(URL).then<StockReport[]>((res) => res.data.data);
};

export default function useGetStockReport(
  date: DateRange | undefined,
  channelUid: string
) {
  const { userInformation } = useAuth();

  const { from, to } = date || {};
  const fromDate = from ? format(from, "yyyy-MM-dd") : "";
  const toDate = to ? format(to, "yyyy-MM-dd") : "";

  return useQuery(
    ["get-stock-report", fromDate, toDate, channelUid, userInformation?.company_uid],
    fetchSalesReport,
    {
      enabled: !!fromDate || !!toDate || (!!channelUid && !!userInformation?.company_uid),
    }
  );
}
