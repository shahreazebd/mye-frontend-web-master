import type { RoyalMailServiceResponse } from "@/schema/royalmail-service";
import { useQuery } from "@tanstack/react-query";

import { fetchPostage } from "@/config/xior";

function getRoyalMailServices() {
  return fetchPostage
    .get<RoyalMailServiceResponse>("/royal-mail/services")
    .then((res) => res.data.data);
}

export function useGetRoyalMailServices() {
  return useQuery({
    queryKey: ["royalmail", "services"],
    queryFn: getRoyalMailServices,
  });
}
