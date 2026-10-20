import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useUpdateCompanyWidgets() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload) => {
      const URL = "/dashboard/mye-dashboard/api/v1/widget/update-company-widgets/";
      return fetch.put(URL, payload);
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["fetch-all-company-widget"]);
        openSuccessNotification(data.message);
        window.location.reload();
      },
      onError: () => {
        openErrorNotification({ description: "Something went wrong" });
      },
    }
  );
}
