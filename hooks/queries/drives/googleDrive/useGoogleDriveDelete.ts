import { useRouter } from "next/router";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useGoogleDriveDelete() {
  const queryClient = useQueryClient();
  const history = useRouter();

  return useMutation(
    (payload: any) => {
      return fetch.delete(
        `/googledrive/api/v1/drive/delete-integration/${payload?.companyUid}/`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-google-drive-details"]);
        openSuccessNotification({ description: "Successfully Deleted" });
        history.push("/settings/drives");
      },
      onError: () => {
        openErrorNotification({ description: "Delete failed" });
      },
    }
  );
}
