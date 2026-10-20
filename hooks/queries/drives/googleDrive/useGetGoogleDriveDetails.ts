import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchDetails = (company_uid: any) => {
  return fetch.get(`/googledrive/api/v1/drive/check-integration/${company_uid}/`);
};

export default function useGetGoogleDriveDetails() {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-google-drive-details"],
    () => fetchDetails(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
