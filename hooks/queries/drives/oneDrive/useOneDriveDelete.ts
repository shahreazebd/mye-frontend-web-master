import { useRouter } from "next/router";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useOneDriveDelete() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (payload: any) => {
      return fetch.delete(`/onedrive/api/v1/onedrive/details/${payload?.companyUid}/`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-google-drive-details"]);
        openSuccessNotification({ description: "Successfully Deleted" });
        router.push("/settings/drives");
      },
      onError: () => {
        openErrorNotification({ description: "Delete failed" });
      },
    }
  );
}
