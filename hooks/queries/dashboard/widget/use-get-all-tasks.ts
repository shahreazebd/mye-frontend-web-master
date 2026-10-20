import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

type Response = {
  data: { unauthorize_count: number; total_open_order: number };
};

const getOrders = ({ queryKey }: QueryFunctionContext) => {
  const [, company_uid] = queryKey;

  return fetch
    .get<Response>(`/dashboard/mye-dashboard/api/v1/widget/status-widget/${company_uid}/`)
    .then((res) => res?.data.data);
};

export default function useGetAllTasks() {
  const { userInformation } = useAuth();

  return useQuery(["get-all-dashboard-tasks", userInformation?.company_uid], getOrders, {
    enabled: !!userInformation?.company_uid,
  });
}
