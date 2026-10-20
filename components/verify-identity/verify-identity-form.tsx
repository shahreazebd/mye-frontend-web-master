"use client";

import React, { HTMLAttributes, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import OtpInput from "react-otp-input";

import { cn } from "@/lib/utils";
import useLogin from "@/hooks/queries/auth/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "../ui/use-toast";

interface VerificationFormProps extends HTMLAttributes<HTMLDivElement> {}

export function VerifyIdentityForm({ className, ...props }: VerificationFormProps) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("login_code") || "";

  const { toast } = useToast();

  const { mutate, isLoading } = useLogin();

  const [{ otp, numInputs, separator, placeholder, inputType }, setConfig] =
    React.useState({
      otp: "",
      numInputs: 6,
      separator: "",
      minLength: 0,
      maxLength: 40,
      placeholder: "",
      inputType: "text" as const,
    });

  const handleOTPChange = (otp: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
  };

  const clearOtp = () => {
    setConfig((prevConfig) => ({ ...prevConfig, otp: "" }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      email: email,
      login_code: otp,
    };

    mutate(payload, {
      onSuccess: (data: {
        status: number;
        data: { data: { access_token: string; refresh_token: string; type: string } };
      }) => {
        if (data?.status !== 302) {
          toast({
            title: "Logged In",
            description: "You have successfully logged in!",
          });
          setCookie("accessToken", data?.data?.data?.access_token);
          setCookie("refreshToken", data?.data?.data?.refresh_token);
          setCookie("userType", data?.data?.data?.type);
          localStorage.removeItem("registerEmail");
          localStorage.removeItem("forgotPasswordEmail");
        }
      },
      onError: (error: any) => {
        if (error) {
          if (error?.response?.status === 500) {
            return toast({
              title: "Error",
              description: "Server is down!, Network Error",
              variant: "destructive",
            });
          } else {
            return toast({
              title: "Error",
              description: "Invalid login code!",
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
  };

  useEffect(() => {
    if (code) {
      setConfig((prevConfig: any) => ({ ...prevConfig, otp: code }));
    }
  }, []);

  return (
    <div className={cn("", className)} {...props}>
      <form onSubmit={handleSubmit} className="otp-div">
        <OtpInput
          inputStyle="inputStyle"
          numInputs={numInputs}
          onChange={handleOTPChange}
          renderSeparator={<span>{separator}</span>}
          value={otp}
          placeholder={placeholder}
          inputType={inputType}
          renderInput={(props) => <Input {...props} />}
          shouldAutoFocus
        />
        <div className="mt-6 grid grid-cols-2 gap-5">
          <Button
            variant="outline"
            type="button"
            disabled={otp?.trim() === ""}
            onClick={clearOtp}
          >
            Clear
          </Button>
          <Button disabled={otp?.length < numInputs || isLoading}>Login</Button>
        </div>
      </form>
    </div>
  );
}
