import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchGetOwner = (companyUid: any) => {
  return fetch.get(
    `/companion/mye-companion/api/v1/companion/get-owner-email/${companyUid}/`
  );
};

export default function useGetOwner() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-get-owner"],
    () => fetchGetOwner(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
      cacheTime: 0,
    }
  );
}
