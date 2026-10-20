// utils
import { useMutation } from "@tanstack/react-query";

import { fetchPayment } from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

interface Payload {
  companyId: string;
  email: string;
  currency: string;
  priceId: string;
}

const checkout = (payload: Payload) => {
  return fetchPayment.post("/api/v1/mye/checkout", payload);
};

export function useCheckout() {
  const { toast } = useToast();

  return useMutation(checkout, {
    onSuccess: () => {
      toast({
        title: "Checkout Successful",
        description: "Redirecting to the checkout URL.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during checkout.";
      toast({
        title: "Checkout Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}
