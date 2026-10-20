import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const getOrderStatus = (trackId: any, companyUid: any) => {
  const url = `/order-tracker/api/v1/trackers/tracker-status-detail/${companyUid}/${trackId}/`;
  return fetch.get(url);
};

export default function useGetOrderStatus(trackId: any) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-order-status", trackId],
    () => getOrderStatus(trackId, userInformation?.company_uid),
    {
      enabled: !!trackId || !!userInformation?.company_uid,
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
}
