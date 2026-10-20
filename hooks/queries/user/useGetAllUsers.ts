import { User } from "@/schema/users";
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchUserData = (company_uid: any) => {
  return fetch
    .get(`/identification/api/v1/get-user/meta/get-all-user/${company_uid}/`)
    .then<User[]>((res) => res.data.data);
};

export default function useGetAllUsers() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-all-user-data", userInformation?.company_uid],
    () => fetchUserData(userInformation?.company_uid),
    {
      enabled: !!userInformation?.company_uid,
      retry: 1,
    }
  );
}
