"use client";

import { CheckCircle2, Crown } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import { useCheckout } from "@/hooks/queries/subscription/use-checkout";
import useGetSinglePrice from "@/hooks/queries/subscription/use-get-single-price";
import { useGetSingleSubscription } from "@/hooks/queries/subscription/use-get-single-subscription";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function SinglePrice({ priceId }: { priceId: string }) {
  const { userInformation } = useAuth();
  const { data, isLoading: priceLoading } = useGetSingleSubscription();
  const { data: price, isLoading: singlePriceLoading } = useGetSinglePrice(priceId);
  const { mutate, isLoading: checkoutLoading } = useCheckout();

  const handleCheckout = () => {
    if (data) {
      mutate({
        companyId: userInformation?.company_uid || "",
        email: data?.customer?.email,
        currency: data?.currency,
        priceId: priceId,
      });
    }
  };

  if (priceLoading || singlePriceLoading) {
    return <div>Loading...</div>;
  }

  if (!price) {
    return <div>Price not found</div>;
  }

  return (
    <Card className="w-[400px] border-slate-700 bg-slate-900 text-white">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Current Plan</h2>
            <p className="text-sm text-slate-400">Enterprise Edition</p>
          </div>
          <Crown className="size-8 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <li className="flex items-center gap-3 text-sm">
          <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
          <span>
            {price?.metadata?.salesChannels === "-1"
              ? "Unlimited"
              : price?.metadata?.salesChannels}{" "}
            Sales Channels
          </span>
        </li>

        <li className="flex items-center gap-3 text-sm">
          <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
          <span>
            {price?.metadata?.salesVolume === "-1"
              ? "Unlimited"
              : price?.metadata?.salesVolume}{" "}
            Sales Volume
          </span>
        </li>

        <li className="flex items-center gap-3 text-sm">
          <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
          <span>
            {price?.metadata?.users === "-1" ? "Unlimited" : price?.metadata?.users} Users
          </span>
        </li>

        <li className="flex items-center gap-3 text-sm">
          <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
          <span>Expert Customer Support</span>
        </li>

        <li className="flex items-center gap-3 text-sm">
          <CheckCircle2 className={`size-5 shrink-0 text-yellow-500`} />
          <span>Cancel Anytime</span>
        </li>
      </CardContent>
      <CardFooter>
        <Button
          disabled={checkoutLoading}
          onClick={handleCheckout}
          variant="outline"
          className="w-full text-black"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
