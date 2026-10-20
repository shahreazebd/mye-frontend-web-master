import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "hooks/custom/useAuth";

const fetchDispatchOrder = ({ queryKey }: QueryFunctionContext) => {
  const [, id, company_uid] = queryKey;

  return axios.get(
    `https://api.manageyourecommerce.com/orders/api/v1/orders/get-all-dispatched-batch/${company_uid}/${id}`
  );
};

export default function useGetAllDispatchOrderBatch(id: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["fetch-close-orders-data-batch-id", id, userInformation?.company_uid],
    queryFn: fetchDispatchOrder,

    retry: 1,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!userInformation?.company_uid || !!id,
  });
}
