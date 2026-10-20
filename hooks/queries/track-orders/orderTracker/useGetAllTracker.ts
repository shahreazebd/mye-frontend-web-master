import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const getAllTracker = ({ date, carrierId, companyUid }: any) => {
  let URL;

  if (carrierId === "dls") {
    URL = "/dhl/api/v1/dhl/get-all-shipment-tracker/";
  } else {
    URL = `/order-tracker/api/v1/trackers/search-by-date/${companyUid}?carrier_uid=${carrierId}&date_to_search=${date}`;
  }

  return fetch.get(URL);
};

export default function useGetAllTracker({ date, carrierId }: any) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-all-trackers", date, carrierId],
    () =>
      getAllTracker({
        date,
        carrierId,
        companyUid: userInformation?.company_uid,
      }),
    {
      enabled: !!userInformation?.company_uid || !!date || !!carrierId,
    }
  );
}
