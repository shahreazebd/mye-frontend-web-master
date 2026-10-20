import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useAuth from "hooks/custom/useAuth";

import { evidentApi } from "@/config/xior";

interface ActivityLog {
  _id: {
    $oid: string;
  };
  data: string;
  user: string;
  type: string;
  parent_type: string;
  avatar_url: string;
  created_at: {
    $date: string;
  };
  seen: boolean;
  clear: boolean;
  company_uid: string;
}

const getActivityLogs = ({ queryKey }: QueryFunctionContext) => {
  const [, tabValue, date, searchText, company_uid] = queryKey;

  const URI = `/notification/evd-alert/api/v1/notification/get/mye`;
  return evidentApi
    .get(URI, {
      params: {
        parent_type: tabValue ? tabValue : null,
        // type: "missing_stock_update",
        date: date ? dayjs(date?.toString()).format("YYYY-MM-DD") : null,
        data: searchText ? searchText : null,
        company_uid: company_uid,
      },
    })
    .then<ActivityLog[]>((res) => res.data.data);
};

export default function useGetActivityLogs(
  tabValue: string | null,
  date: Date | undefined,
  searchText: string | null
) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-activity-logs", tabValue, date, searchText, userInformation?.company_uid],
    getActivityLogs,
    {
      enabled: !!userInformation?.company_uid || !!tabValue || !!date || !!searchText,
    }
  );
}
