"use client";

import { useState } from "react";
import Link from "next/link";
import { countryToCurrency } from "@/utils/countryToCurrency";
import { CheckIcon } from "lucide-react";

import useGetAllPrice from "@/hooks/queries/subscription/use-get-all-price";
import { useGetSingleSubscription } from "@/hooks/queries/subscription/use-get-single-subscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PricingCard from "../pricing/pricing-card";
import CountrySelect from "../shared/country-select";

export default function HomePricing() {
  const [currency, setCurrency] = useState("gbp");
  const [packageInterval, setPackageInterval] = useState("month");
  const { data: subscription } = useGetSingleSubscription();
  const { data: allPrices, isLoading: priceLoading } = useGetAllPrice();

  const currencySign = currency === "usd" ? "$" : currency === "eur" ? "€" : "£";

  return (
    <div className="container">
      <Tabs
        defaultValue={packageInterval}
        className="rounded-3xl bg-[#030711] pb-14 pt-20"
        onValueChange={(value) => setPackageInterval(value)}
      >
        <h5 className="text-center text-3xl text-white lg:text-4xl">Our Prices</h5>
        <p className="mx-auto mt-6 text-center text-xs text-white/70 lg:mt-2 lg:w-7/12 xl:text-lg">
          MYE simplifies online selling by connecting with popular ecommerce platforms,
          marketplaces, and shipping carriers.
        </p>
        <div className="mx-auto grid gap-4 pt-16 lg:w-[750px] lg:grid-cols-2">
          <TabsList className="mb-6 grid grid-cols-2">
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="year">Yearly</TabsTrigger>
          </TabsList>
          <CountrySelect
            className="popover-trigger-width mb-2"
            defaultValue="United Kingdom"
            onChange={(value) => setCurrency(countryToCurrency(value as string) || "gbp")}
          />
        </div>
        <TabsContent value={packageInterval}>
          <div className="mt-10 grid grid-cols-2 items-center justify-center gap-6 lg:grid-cols-4 2xl:px-24">
            {priceLoading ? (
              <p className="col-span-2 gap-2 text-center text-white md:col-span-4 lg:col-span-5 xl:col-span-6 ">
                loading...
              </p>
            ) : (
              <>
                {!subscription?.id && (
                  <TrialCard
                    currencySign={currencySign}
                    packageInterval={packageInterval}
                  />
                )}
                {allPrices
                  ?.filter((price) => price.recurring.interval === packageInterval)
                  .map((data) => {
                    return (
                      <PricingCard
                        key={data?.id}
                        price={data}
                        currency={currency}
                        currencySign={currencySign}
                        subscribedPriceId={subscription?.customer?.stripePriceId ?? ""}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TrialCard({ currencySign, packageInterval }: any) {
  return (
    <Card className="border-t-4 border-t-[rgb(161,161,170)]">
      <CardHeader>
        <CardTitle>30 Days Free Trial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-1 space-y-1">
          <h4>{currencySign} 0 </h4>
          <span>{packageInterval === "monthly" ? "/month" : "/year"}</span>
        </div>

        <ul role="list" className="space-y-3 pb-4 pt-6 leading-6 text-gray-600">
          {[
            "Unlimited Sales Volume",
            "Unlimited Users",
            "Unlimited Sales Channels",
            "Expert Customer Support",
            "Cancel Anytime",
          ].map((list) => (
            <li className="flex gap-x-3 text-sm" key={list}>
              <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
              {list}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/register" className="w-full">
          <Button className="w-full" variant={"default"}>
            Get Free Trial
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
