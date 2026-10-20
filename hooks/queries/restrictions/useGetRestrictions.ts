import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchRestriction = (companyUid: any) => {
  return fetch.get(
    `/identification/api/v1/identification/restriction/get/${companyUid}/`
  );
};

export default function useGetRestrictions() {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-restrictions"],
    () => fetchRestriction(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
