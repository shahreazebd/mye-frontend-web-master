import { openErrorNotification } from "@/utils/notification";
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchPreviewTableData = (channelId: any, company_uid: any) => {
  return fetch.get(
    `/reports/api/v1/order/open-order/get-click-and-drop/${company_uid}/${channelId}/`
  );
};

export default function useClicknDropPreview(channelId: any) {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-royalmail-data", channelId],
    () => fetchPreviewTableData(channelId, userInformation?.company_uid),
    {
      enabled: !!channelId && !!userInformation?.company_uid,

      onError: (error: any) => {
        if (error.response) {
          if (error.response.status === 500) {
            return openErrorNotification({ description: "Network Error" });
          }

          openErrorNotification({ description: "Something went wrong" });
        } else if (error.request) {
          openErrorNotification({ description: "Request error" });
        } else {
          openErrorNotification({ description: "Error" });
        }
      },
    }
  );
}
