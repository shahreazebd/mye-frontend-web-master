import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

const deleteOwner = (payload: any) => {
  return fetch.delete(
    `/companion/mye-companion/api/v1/companion/delete-company/${payload?.companyUid}/`
  );
};

export default function useDeleteOwner() {
  const queryClient = useQueryClient();

  return useMutation(deleteOwner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-get-owner"]);
      openSuccessNotification({ description: "Successfully Deleted!" });
    },
    onError: (error: any) => {
      openErrorNotification({ description: error?.response?.data?.message });
    },
  });
}
