import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const getAllCarrier = () => {
  return fetch.get("/order-tracker/api/v1/carrier/get-all-carrier/");
};

export default function useGetAllCarrier() {
  return useQuery(["fetch-all-carrier"], getAllCarrier);
}
