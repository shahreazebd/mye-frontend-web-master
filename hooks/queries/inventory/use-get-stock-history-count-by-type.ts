import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

type Option = {
  company_uid: string;
  location_id: number;
  filter_type: "RETURN";
};

export type StockHistoryCountByTypeResponse = {
  success: boolean;
  data: { [key: string]: number };
  message: string;
};

function getStockHistoryCountByType({
  queryKey,
}: QueryFunctionContext<[string, Option]>) {
  const [, option] = queryKey;

  return fetch
    .post<StockHistoryCountByTypeResponse>(
      `/miams/api/v1/stock/stock-history-count-by-type/`,
      option
    )
    .then((res) => res.data.data);
}

export function useGetStockHistoryCountByType(option: Option) {
  return useQuery({
    queryKey: ["stock-history-count-by-type", option],
    queryFn: getStockHistoryCountByType,
    enabled: !!option.company_uid,
  });
}
