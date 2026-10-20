import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MainFooter from "@/components/footer/main-footer";
import MainNavigation from "@/components/navigation/main/main-navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  // alternates: {
  //   canonical: "https://www.attendancekeeper.net/404",
  // },
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <MainNavigation />
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-xl space-y-6 text-center">
          <div className="flex justify-center">
            <AlertTriangle className="text-yellow-500" size={48} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link className={cn(buttonVariants())} href="/">
            Back to Home
          </Link>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
