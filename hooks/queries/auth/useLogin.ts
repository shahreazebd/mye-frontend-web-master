import { useMutation } from "@tanstack/react-query";
// import useAuth from "hooks/custom/useAuth";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const login = (payload: any) => {
  return fetchAuth.post("/evident/auth/api/v1/user/login/", payload);
};

export default function useLogin() {
  const { toast } = useToast();

  return useMutation(login, {
    onSuccess: ({ data }) => {
      const { restrictions, type } = data?.data ?? {};

      if (
        restrictions?.subscribed === true &&
        ["parent", "child", "w_manager", "temu_test"].includes(type)
      ) {
        if (type === "temu_test") {
          window.location.href = "/settings/products";
          return;
        }

        window.location.href = "/dashboard";
      } else if (localStorage.getItem("trailClick")) {
        window.location.href = "/active-trial";
      } else {
        if (type === "temu_test") {
          window.location.href = "/settings/products";
          return;
        }
        location.href = "/dashboard";
      }

      // else if (data?.data?.data?.restrictions.subscribed === false && packageClick) {
      //   window.location.href = `/checkout/${packageClick}`;
      // } else {
      //   location.href = "/pricing";
      // }
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        if (error?.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Server is down!, Network Error",
            variant: "destructive",
          });
        }

        if (
          error?.response?.status === 400 &&
          (error as any).response.data.message !== "User is not verified"
        ) {
          return toast({
            title: "Invalid Credentials",
            description: "Email or password is wrong",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Try Again",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
    },
  });
}
