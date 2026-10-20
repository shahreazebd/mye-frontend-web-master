import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const getOrphanProducts = (company_uid: any, channelUid: any) => {
  const URI = `/miams/api/v1/mapping/product/remote-product/orphan-product-check/${company_uid}/${channelUid}/`;
  return fetch.get(URI).then((res) => res?.data?.data);
};

export default function useGetOrphanProducts(channelUid: any) {
  const { userInformation } = useAuth();

  return useQuery(
    ["get-orphan-products", channelUid],
    () => getOrphanProducts(userInformation?.company_uid, channelUid),
    {
      enabled: !!channelUid && !!userInformation?.company_uid,
    }
  );
}
