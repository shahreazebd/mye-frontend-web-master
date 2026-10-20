import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const allWidget = () => {
  return fetch.get("/dashboard/mye-dashboard/api/v1/widget/get-all/");
};

export default function useGetAllWidget() {
  return useQuery(["fetch-all-widget"], allWidget);
}
