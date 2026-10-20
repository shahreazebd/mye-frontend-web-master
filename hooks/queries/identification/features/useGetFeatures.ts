import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const getFeatures = () => {
  return fetch.get("/identification/api/v1/identification/feature/get-all/mye/");
};

export default function useGetFeatures() {
  return useQuery(["get-Features"], getFeatures);
}
