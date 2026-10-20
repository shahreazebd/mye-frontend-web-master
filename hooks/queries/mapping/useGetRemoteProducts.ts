import mappingAtom from "@/atoms/mappingAtom";
import { useRemoteProductFilterBy } from "@/atoms/remoteProductsAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";
import { useAtom } from "jotai";

import { RemoteProductResponse } from "@/types/remote-product";
import fetch from "@/config/xior";

function getRemoteProducts({ queryKey }: QueryFunctionContext) {
  const [, channelUid, company_uid, sync_inventory] = queryKey;
  return fetch
    .get<RemoteProductResponse>(
      `/miams/api/v1/mapping/mapped-product/${company_uid}/${channelUid}/`,
      {
        params: {
          sync_inventory,
        },
      }
    )
    .then((res) => res.data);
}

export default function useGetRemoteProducts() {
  const [mapping] = useAtom(mappingAtom);
  const { userInformation } = useAuth();
  const { remoteProductsFilterBy } = useRemoteProductFilterBy();

  return useQuery({
    queryKey: [
      "remote-product-mapping-data",
      mapping.channelUUid,
      userInformation?.company_uid,
      remoteProductsFilterBy?.syncInventory,
    ],
    queryFn: getRemoteProducts,
    enabled: !!mapping.channelUUid || !!userInformation?.company_uid,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
}
