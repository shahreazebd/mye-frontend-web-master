import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetchChannelsData = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid] = queryKey;

  return fetch
    .get(`/integration/api/v1/channel/get-company-channel/${companyUid}/`)
    .then((res) => res.data.data);
};

export default function useGetCompanyChannels() {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["get-comapny-channels", userInformation?.company_uid],
    queryFn: fetchChannelsData,
    enabled: !!userInformation?.company_uid,
    retry: false,
  });
}
