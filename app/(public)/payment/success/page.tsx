import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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

import { PaymentDetails } from "./payment-details";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="size-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentDetails />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <Link href="/dashboard" className={cn(buttonVariants())}>
            Go to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
