import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const fetchUserData = (id: any) => {
  return fetch.get(`/identification/api/v1/get-user/meta/details/${id}/`);
};

export default function useGetUserDetails(id: any) {
  return useQuery(["get-user-details"], () => fetchUserData(id), { enabled: !!id });
}
