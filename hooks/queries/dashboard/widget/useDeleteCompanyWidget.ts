import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const deleteCompanyWidget = (id: any) => {
  const URL = `/dashboard/mye-dashboard/api/v1/widget/delete-company-widget/${id}/`;

  return fetch.delete(URL);
};

export default function useDeleteCompanyWidget() {
  const queryClient = useQueryClient();

  return useMutation(deleteCompanyWidget, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-company-widget"]);
      queryClient.invalidateQueries(["fetch-all-widget"]);
      openSuccessNotification({ description: "Successfully Deleted!" });
    },
    onError: (error: any) => {
      openErrorNotification({ description: error?.response?.data?.message });
    },
  });
}
