import type { BuyPostagePayloadResponse } from "@/schema/buy-postage-payload";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// fetch function
function fetcher() {
  const url = window.location.origin + "/api/postages";
  return axios.get<BuyPostagePayloadResponse>(url).then((res) => {
    return res.data.data;
  });
}

export default function useGetPostagePayload() {
  return useQuery(["get-postages-payload"], fetcher);
}
