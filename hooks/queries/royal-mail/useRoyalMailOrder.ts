import { openSuccessNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

const royalMailOrder = (data: any) => {
  return fetch.post(`/royalmail/api/v1/click-and-drop/create-order/`, data);
};

export default function useRoyalMailOrder() {
  return useMutation(royalMailOrder, {
    onSuccess: () => {
      openSuccessNotification({
        description: "Click and Drop account integrated successfully",
      });
    },
  });
}
