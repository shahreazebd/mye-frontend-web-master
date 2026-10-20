import { openErrorNotification } from "@/utils/notification";
import { downloadPDF } from "@/utils/pdf-download";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

type MergePDFPayload = {
  urls: string[] | null[];
  scale: number;
};

export function useMergePDF() {
  return useMutation({
    mutationKey: ["merge-pdf"],
    mutationFn: async (payload: MergePDFPayload) => {
      const response = await fetchPostage.post("/utils/pdf/merge", payload, {
        responseType: "blob",
      });
      return response;
    },
    onSuccess: (res) => {
      try {
        console.log(res);
        // downloadPDF(res.data, "postage.pdf");
      } catch {
        openErrorNotification({ description: "Failed to download PDF" });
      }
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      }
    },
  });
}
