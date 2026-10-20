import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchDetails = (company_uid: any) => {
  return fetch.get(`/dropbox/api/v1/dropbox/details/${company_uid}/`);
};

export default function useGetDropboxDetails() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-dropbox-details"],
    () => fetchDetails(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
