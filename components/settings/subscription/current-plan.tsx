"use client";

import { CheckCircle2, Crown } from "lucide-react";

import { useCheckout } from "@/hooks/queries/subscription/use-checkout";
import { useCustomerPortal } from "@/hooks/queries/subscription/use-customer-portal";
import { useGetSingleSubscription } from "@/hooks/queries/subscription/use-get-single-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CurrentPlan() {
  const { data, isLoading } = useGetSingleSubscription();
  const { mutate: checkoutMutate, isLoading: checkoutLoading } = useCheckout();
  const { mutate: portalMutate, isLoading: portalLoading } = useCustomerPortal();

  const handleCheckout = () => {
    if (data) {
      checkoutMutate({
        companyId: data?.companyId,
        email: data?.customer?.email,
        currency: data?.currency,
        priceId: data?.customer?.stripePriceId,
      });
    }
  };

  const handlePortal = () => {
    if (data) {
      portalMutate({
        companyId: data?.companyId,
        customerId: data?.customer?.stripeCustomerId,
      });
    }
  };

  if (isLoading) {
    return <p className="mt-20">Loading...</p>;
  }

  return data?.id ? (
    <div className="flex justify-center">
      <Card className="w-[400px] border-slate-700 bg-slate-900 text-white">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Current Plan{" "}
                <span className="text-sm capitalize text-yellow-500">
                  ({data?.status?.toLocaleLowerCase()})
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                {data?.amount / 100} {data?.currency} / {data?.interval}{" "}
              </p>
            </div>
            <Crown className="size-8 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {data?.features
            ?.filter((feat) => feat?.status)
            .map((feature) => (
              <li className="flex items-center gap-3 text-sm" key={feature.id}>
                <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
                <span>
                  {feature?.quantity} {feature.name}
                </span>
              </li>
            ))}

          <li className="flex items-center gap-3 text-sm">
            <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
            <span>Cancel Anytime</span>
          </li>

          <li className="flex items-center gap-3 text-sm">
            <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
            <span>Expert Customer Support</span>
          </li>
        </CardContent>
        <CardFooter>
          {data?.status === "SUBSCRIBED" ? (
            <Button
              variant="outline"
              className="w-full text-black"
              onClick={handlePortal}
              disabled={portalLoading}
            >
              Manage Subscription
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-black"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              Buy Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  ) : (
    <p className="mt-20">No Subscription found</p>
  );
}
