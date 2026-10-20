import Link from "next/link";
import { XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CancelDetails } from "./cancel-details";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <XCircle className="size-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Unsuccessful</CardTitle>
          <CardDescription>
            Your payment was not completed. No charges have been made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CancelDetails />
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              If you have any questions or need further assistance, please contact our
              support team.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <Link
            href="/"
            className={cn("w-full sm:w-auto", buttonVariants({ variant: "outline" }))}
          >
            Return Home
          </Link>

          <Link
            href="/pricing"
            className={cn("w-full sm:w-auto", buttonVariants({ variant: "default" }))}
          >
            Try Again
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
