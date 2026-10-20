import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const allWidget = (company_uid: any) => {
  const URL = `/dashboard/mye-dashboard/api/v1/widget/get-one-company-widgets/${company_uid}/`;
  return fetch.get(URL);
};

export default function useGetAllCompanyWidget() {
  const { userInformation } = useAuth();
  return useQuery(
    ["fetch-all-company-widget"],
    () => allWidget(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
