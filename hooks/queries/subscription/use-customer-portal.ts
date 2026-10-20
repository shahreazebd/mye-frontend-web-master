import { useMutation } from "@tanstack/react-query";

import { fetchPayment } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

interface Payload {
  customerId: string;
  companyId: string;
}

const customerPortal = (payload: Payload) => {
  return fetchPayment.post("/api/v1/mye/customer/stripe/portal", payload);
};

export function useCustomerPortal() {
  const { toast } = useToast();

  return useMutation(customerPortal, {
    onSuccess: () => {
      toast({ description: "Redirecting to the customer portal." });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during checkout.";
      toast({ description: errorMessage, variant: "destructive" });
    },
  });
}
