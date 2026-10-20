import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import { Subscription } from "@/types/subscription";
import { fetchPayment } from "@/config/xior";

interface SubscriptionResponse extends Subscription {
  trialDaysLeft: number;
}

const getSubscriptions = (companyUid: string) => {
  return fetchPayment
    .get(`/api/v1/mye/subscription/${companyUid}/`)
    .then<SubscriptionResponse>((res) => res.data?.data);
};

export function useGetSingleSubscription() {
  const { userInformation } = useAuth();

  return useQuery(
    ["single-subscription"],
    () => getSubscriptions(userInformation?.company_uid || ""),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
