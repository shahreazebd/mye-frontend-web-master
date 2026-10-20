import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchRoyalMailAccountData = (company_uid: any) => {
  return fetch.get(`/integration/api/v1/carrier/click-and-drop/get-user/${company_uid}/`);
};

export default function useGetRoyalMailAccount() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-royalmail-data"],
    () => fetchRoyalMailAccountData(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
