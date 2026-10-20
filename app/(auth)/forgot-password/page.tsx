import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";
import AuthFooterText from "@/components/shared/auth-footer-text";
import AuthLeftSideContent from "@/components/shared/auth-left-side-content";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Authentication forms built using the components.",
};

export default function ForgotPassword() {
  return (
    <div className="container relative grid h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Register
      </Link>

      <AuthLeftSideContent />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email,we will send a code to your email.
            </p>
          </div>
          <ForgotPasswordForm />
          <AuthFooterText />
        </div>
      </div>
    </div>
  );
}
