import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export default function useVerifyAccount() {
  const { toast } = useToast();
  const history = useRouter();

  return useMutation(
    (verify: any) => {
      return fetchAuth.post("/evident/auth/api/v1/user/confirm/", verify);
    },
    {
      onSuccess: () => {
        toast({ title: "Success", description: "Account verified successfully" });
        history.push("/login");
      },
      onError: (error: unknown) => {
        if (error instanceof XiorError) {
          toast({
            title: "Error",
            description: error.response?.data.message,
            variant: "destructive",
          });
        } else if (error instanceof Error)
          toast({ title: "Error", description: error.message, variant: "destructive" });
        else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      },
    }
  );
}
