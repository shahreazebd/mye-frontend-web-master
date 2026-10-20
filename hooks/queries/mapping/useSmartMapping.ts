import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const fetchSmartMappingData = (channelUid: any, company_uid: any) => {
  return fetch.get(`/miams/api/v1/mapping/smart-mapping/${company_uid}/${channelUid}/`);
};

export default function useSmartMapping(channelUid: any) {
  const { userInformation } = useAuth();
  const { toast } = useToast();

  return useQuery(
    ["fetch-smart-mapping", channelUid],
    () => fetchSmartMappingData(channelUid, userInformation?.company_uid),
    {
      enabled: false,
      onSuccess: (res) => {
        toast({
          title: "Success",
          description: res?.data?.message || "Smart mapping data fetched successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch smart mapping data",
          variant: "destructive",
        });
      },
    }
  );
}
