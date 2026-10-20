import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const mutateDispatch = (payload: unknown) => {
  return fetch.post("/orders/api/v1/orders/dispatch-after-label-create/", payload);
};

export default function useDispatchAfterLabelCreate() {
  const { toast } = useToast();

  return useMutation(mutateDispatch, {
    onSuccess: () => {
      toast({ title: "Successful" });
    },
  });
}
