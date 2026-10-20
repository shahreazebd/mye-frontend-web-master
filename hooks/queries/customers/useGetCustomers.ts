import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import { CustomarOverview } from "@/types/customer-overview";
import fetch from "@/config/xior";

const fetchCustomersTableData = ({ queryKey }: QueryFunctionContext) => {
  const [, channelId, company_uid] = queryKey;
  let url = "";

  if (channelId === "all") {
    url = `/orders/api/v1/orders/get-all-customers/${company_uid}/`;
  } else {
    url = `/orders/api/v1/orders/get-all-customers/${company_uid}/${channelId}/`;
  }

  return fetch.get(url).then<CustomarOverview[]>((res) => res.data.data);
};

export default function useGetCutomers(uuid: string) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-customers-data", uuid, userInformation?.company_uid],
    fetchCustomersTableData,
    {
      enabled: !!uuid || !!userInformation?.company_uid,
      refetchOnWindowFocus: false,
    }
  );
}
