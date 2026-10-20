import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useAuth from "hooks/custom/useAuth";
import { DateRange } from "react-day-picker";

import fetch from "@/config/xior";

export interface Order {
  channelName: string;
  order: number;
}

const getOrders = ({ queryKey }: QueryFunctionContext) => {
  const [, company_uid, from, to] = queryKey;

  return fetch.get(
    `/dashboard/mye-dashboard/api/v1/order/orders-by-channel/${company_uid}`,
    {
      params: {
        time_zone: "Asia/Dhaka",
        start_date: from,
        end_date: to,
      },
    }
  );
};

export default function useGetAllAccountTopOrders(date: DateRange | undefined) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: [
      "fetch-dashboard-orders",
      userInformation?.company_uid,
      dayjs(date?.from).format("YYYY-MM-DD"),
      dayjs(date?.to).format("YYYY-MM-DD"),
    ],
    queryFn: getOrders,

    select: (data) => {
      const mapped = data?.data?.data
        .sort((a: any, b: any) => (a.order > b.order ? -1 : 1))
        .map((v: any) => v);

      const response = mapped.map((e: any) => {
        return {
          channelName: e.channel_name,
          order: e.order,
        };
      });

      return response as Order[];
    },

    enabled: !!userInformation?.company_uid && !!date?.from && !!date?.to,
  });
}
