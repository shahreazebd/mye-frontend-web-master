import { useRouter } from "next/router";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

export default function useDropboxDelete() {
  const queryClient = useQueryClient();
  const history = useRouter();

  return useMutation(
    (payload: any) => {
      return fetch.delete(`/dropbox/api/v1/dropbox/details/${payload?.companyUid}/`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-dropbox-details]"]);
        openSuccessNotification({ description: "Successfully Deleted" });
        history.push("/settings/drives");
      },
      onError: () => {
        openErrorNotification({ description: "Deleted failed" });
      },
    }
  );
}
