"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetUserDetails from "@/hooks/queries/user/useGetUserDetails";
import { buttonVariants } from "@/components/ui/button";

// import { ThemeToggle } from "@/components/theme-toggle";

import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";

export default function MainNavigation() {
  const { userInformation } = useAuth();
  const { isSuccess } = useGetUserDetails(userInformation?.id as string);

  return (
    <header className="sticky top-0 z-[9999] w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {isSuccess ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "hidden pt-2.5 lg:block"
                )}
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "hidden pt-2.5 lg:block"
                  )}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className={cn(buttonVariants(), "hidden pt-2.5 lg:block")}
                >
                  Register
                </Link>
              </div>
            )}

            <MobileMenu isSuccess={isSuccess} />
          </nav>
        </div>
      </div>
    </header>
  );
}
