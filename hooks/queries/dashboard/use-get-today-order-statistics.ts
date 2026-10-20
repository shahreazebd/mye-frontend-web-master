import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export interface OrderStatistics {
  total_order: number;
  total_order_percentage: number;
  to_dipatch: number;
  to_dispatch_percentage: number;
  dispatched: number;
  dispatched_percentage: number;
}

const getOrderStatistics = ({ queryKey }: QueryFunctionContext) => {
  const [, company_uid] = queryKey;

  return fetch
    .get(`/orders/api/v1/orders/dashboard/order-statistics-today/${company_uid}`)
    .then<OrderStatistics>(({ data }) => data?.data);
};

export function useGetTodayOrderStatistics() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-today-orders-statistics", userInformation?.company_uid],
    getOrderStatistics,
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
