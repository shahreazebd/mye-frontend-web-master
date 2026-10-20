import { useQuery } from "@tanstack/react-query";

import { fetchAuth } from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetchUserData = (id: any) => {
  return fetchAuth.get(`/evident/auth/api/v1/user/get-user/${id}/`);
};

export default function useGetUserInformation() {
  const { userInformation } = useAuth();

  return useQuery(["get-user-data-update"], () => fetchUserData(userInformation?.id), {
    enabled: !!userInformation?.id,
  });
}
