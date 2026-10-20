import { channelAtom } from "@/atoms/channelAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAuth from "hooks/custom/useAuth";
import { useAtom } from "jotai";
import { DateRange } from "react-day-picker";

import fetch from "@/config/xior";

const fetchDispatchOrder = ({ queryKey }: QueryFunctionContext) => {
  const [, channel_uid, start_date, end_date, company_uid] = queryKey;

  return fetch
    .get("/orders/api/v1/orders/close-orders", {
      params: {
        company_uid,
        channel_uid: channel_uid === "" ? "all" : channel_uid,
        start_date,
        end_date,
      },
    })
    .then((res) =>
      res.data.data.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
    );
};

export default function useGetDispatchOrder(date: DateRange | undefined) {
  const { userInformation } = useAuth();
  const [channel] = useAtom(channelAtom);

  const { from, to } = date || {};
  const start_date = from ? format(from, "yyyy-MM-dd") : "";
  const end_date = to ? format(to, "yyyy-MM-dd") : "";

  return useQuery({
    queryKey: [
      "fetch-close-orders-data",
      channel.uuid,
      start_date,
      end_date,
      userInformation?.company_uid,
    ],
    queryFn: fetchDispatchOrder,

    retry: 1,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    enabled:
      (!!channel.uuid || !!userInformation?.company_uid) && !!start_date && !!end_date,
  });
}
