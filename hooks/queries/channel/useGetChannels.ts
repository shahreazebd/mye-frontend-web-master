import { Channel } from "@/schema/channel";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetchChannelsData = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUuid] = queryKey;

  return fetch
    .get(`/integration/api/v1/channel/get-all-channels/${companyUuid}/`)
    .then<Channel[]>((res) => res.data.data);
};

export default function useGetChannels() {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["get-channels", userInformation?.company_uid],
    queryFn: fetchChannelsData,
    // staleTime: 0,
    // set a time to refetch data

    enabled: !!userInformation?.company_uid,
    // retry: 0,
    retry: false,

    // refetchOnWindowFocus: false,
  });
}
