import { Channel } from "@/schema/channel";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export function getChannelDetails({
  queryKey,
}: QueryFunctionContext<["fetch-channel-data-details", string, string | undefined]>) {
  const [, chanelUUid, company_uid] = queryKey;

  return fetch
    .get(`integration/api/v1/channel/get-channel-details/${company_uid}/${chanelUUid}/`)
    .then<Channel>((res) => res.data.data.channel);
}

export default function useGetChannelDetails(chanelUUid: string) {
  const { userInformation } = useAuth();

  let channel = "";
  if (chanelUUid !== "all") {
    channel = chanelUUid;
  }

  return useQuery(
    ["fetch-channel-data-details", channel, userInformation?.company_uid],
    getChannelDetails,
    {
      enabled: !!channel && !!userInformation?.company_uid,
      staleTime: 1000 * 60,
    }
  );
}
