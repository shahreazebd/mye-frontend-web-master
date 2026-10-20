import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import { fetchPostage } from "@/config/xior";

export interface DailyPostageStatsResponse {
  success: boolean;
  data: {
    series: Array<{
      date: string;
      count: number;
    }>;
  };
}

function getPostageDailyStats(days: number, companyUuid?: string) {
  return fetchPostage
    .get<DailyPostageStatsResponse>("/dashboard/stats/daily", {
      params: {
        days,
      },
      headers: companyUuid
        ? {
            "x-company-id": companyUuid,
          }
        : undefined,
    })
    .then((res) => res.data);
}

export default function useGetPostageDailyStats(days: number) {
  const { userInformation } = useAuth();
  const companyUuid = userInformation?.company_uid;

  return useQuery({
    queryKey: ["postage", "daily-stats", days, companyUuid],
    queryFn: () => getPostageDailyStats(days, companyUuid),
    enabled: !!companyUuid && !!days,
  });
}
