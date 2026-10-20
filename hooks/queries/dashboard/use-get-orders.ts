import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

interface Order {
  day: string;
  order: number;
  dispatched: number;
}

const getOrders = ({ queryKey }: QueryFunctionContext) => {
  const [, days, company_uid] = queryKey;

  return fetch
    .get(
      `/orders/api/v1/orders/dashboard/orders-per-day/${company_uid}?time_zone=Asia%2FDhaka&days=${days}`
    )
    .then<Order[]>((res) => res?.data?.data);
};

export default function useGetOrders(days: string) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-dashboard-orders", days, userInformation?.company_uid],
    getOrders,
    {
      enabled: !!days && !!userInformation?.company_uid,
    }
  );
}
