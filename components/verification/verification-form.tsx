"use client";

import React, { HTMLAttributes, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";

import { cn } from "@/lib/utils";
import useTryAgain from "@/hooks/queries/auth/useTryAgain";
import useVerifyAccount from "@/hooks/queries/auth/useVerifyAccount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerificationFormProps extends HTMLAttributes<HTMLDivElement> {}

export function VerificationForm({ className, ...props }: VerificationFormProps) {
  const { mutate, isLoading } = useVerifyAccount();
  const { mutate: triggerSendResendCode, isLoading: isLoadingResendCode } = useTryAgain();

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("validation_code") || "";

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
      validation_code: otp,
    };

    mutate(payload, {
      onSuccess: () => {
        window.location.href = "/login";
      },
    });
  };

  const handleResendCode = () => {
    triggerSendResendCode({ email: email });
  };

  useEffect(() => {
    setConfig((prevConfig: any) => ({ ...prevConfig, otp: code }));
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
          <Button disabled={otp?.length < numInputs || isLoading}>Verify</Button>
        </div>
      </form>
      <p className="mt-5 text-center text-sm">
        Did not get verification code?{" "}
        <span
          onClick={handleResendCode}
          className={cn(
            "cursor-pointer text-blue-600 hover:border-b hover:border-blue-600",
            isLoadingResendCode && ""
          )}
        >
          Click here.
        </span>
      </p>
    </div>
  );
}
