import { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/register/register-form";
import AuthFooterText from "@/components/shared/auth-footer-text";
import AuthLeftSideContent from "@/components/shared/auth-left-side-content";

export const metadata: Metadata = {
  title: "Register",
  description: "Authentication forms built using the components.",
};

export default function Register() {
  return (
    <div className="container relative grid h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthLeftSideContent />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Register your account
            </h1>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="hover:text-primary/80 font-medium text-primary"
              >
                Login
              </Link>
            </p>
          </div>
          <RegisterForm />
          <AuthFooterText />
        </div>
      </div>
    </div>
  );
}
