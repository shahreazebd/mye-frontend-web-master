import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const getAllLostTracker = ({ startDate, endDate, companyUid }: any) => {
  const URL = `/order-tracker/api/v1/trackers/ordertracker-loss/?start_date=${startDate}&end_date=${endDate}&company_uid=${companyUid}`;

  return fetch.get(URL);
};

export default function useGetLostOrderTracker({ startDate, endDate }: any) {
  const { userInformation } = useAuth();

  return useQuery(
    ["lost-all-trackers-data", startDate, endDate],
    () =>
      getAllLostTracker({
        startDate,
        endDate,
        companyUid: userInformation?.company_uid,
      }),
    { enabled: !!startDate || !!endDate || !!userInformation?.company_uid }
  );
}
