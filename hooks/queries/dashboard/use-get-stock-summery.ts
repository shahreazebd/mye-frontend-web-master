import locationAtom from "@/atoms/locationAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";
import { useAtom } from "jotai";

import fetch from "@/config/xior";

interface Stock {
  name: string;
  value: number;
}
const getOrders = ({ queryKey }: QueryFunctionContext) => {
  const [, company_uid, locationId] = queryKey;

  return fetch.get(`/miams/api/v1/stock/summary/${company_uid}/${locationId}/`);
};

export default function useGetStockSummery() {
  const { userInformation } = useAuth();
  const [location] = useAtom(locationAtom);

  return useQuery(
    ["fetch-dashboard-orders", userInformation?.company_uid, location?.locationId],
    getOrders,
    {
      enabled: !!location?.locationId && !!userInformation?.company_uid,
      select: (data) => {
        const { stock_zero, stock_warning, stock_safe } = data?.data?.data || {};

        const response = [
          { name: "Safe", value: stock_safe },
          { name: "Warning", value: stock_warning },
          { name: "Zero", value: stock_zero },
        ];

        return response as Stock[];
        // const total = stock_zero + stock_warning + stock_safe;
        // const stockZero = parseInt((stock_zero / total) * 100);
        // const stockWarning = parseInt((stock_warning / total) * 100);
        // const stockSafe = parseInt((stock_safe / total) * 100);
        // const response = [stockZero, stockWarning, stockSafe];
      },
    }
  );
}
