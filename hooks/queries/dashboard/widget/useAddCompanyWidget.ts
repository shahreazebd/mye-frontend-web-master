import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const addCompanyWidget = (payload: any) => {
  const URL = "/dashboard/mye-dashboard/api/v1/widget/create-company-widget/";
  return fetch.post(URL, payload);
};

export default function useAddCompanyWidget() {
  const queryClient = useQueryClient();

  return useMutation(addCompanyWidget, {
    onSuccess: () => {
      openSuccessNotification({ description: "Widget added" });
      queryClient.invalidateQueries(["fetch-all-company-widget"]);
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          openErrorNotification({ description: "Network Error" });
        }

        if (error.response.status === 400) {
          openErrorNotification({
            description: error?.response?.data?.message,
          });
        }
      } else if (error.request) {
        openErrorNotification({ description: "Request error" });
      } else {
        openErrorNotification({ description: "Error" });
      }
    },
  });
}
