import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const reportColumnName = () => {
  return fetch.get(`/integration/api/v1/channel/get-report-columns/`);
};

export default function useGetReportColumnName() {
  return useQuery(["fetch-report-columns-data"], reportColumnName);
}
