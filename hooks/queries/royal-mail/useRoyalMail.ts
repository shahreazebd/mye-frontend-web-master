import { openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

const royalMail = (data: any) => {
  return fetch.post(`/integration/api/v1/carrier/click-and-drop/add-user/`, data);
};

export default function useRoyalMail() {
  return useMutation(royalMail, {
    onSuccess: () => {
      openSuccessNotification({
        description: "Click and Drop account integrated successfully",
      });
    },
  });
}
