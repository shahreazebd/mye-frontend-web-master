import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchDetails = (company_uid: string) => {
  return fetch.get(`/onedrive/api/v1/onedrive/details/${company_uid}/`);
};

export default function useGetOneDriveDetails() {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-one-drive-details"],
    () => fetchDetails(userInformation?.company_uid as string),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
