import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";

import { Price } from "@/types/price";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";

interface Props {
  price: Price;
  currencySign: string;
  subscribedPriceId: string;
  currency: string;
}

export default function PricingCard(props: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const { userInformation } = useAuth();

  const { price, currencySign, subscribedPriceId, currency } = props;
  const unitAmount = +price?.currency_options?.[currency]?.unit_amount_decimal;

  const handleClick = (priceID: string) => {
    if (userInformation) {
      router.push(`/pricing/${priceID}`);
    } else {
      localStorage.setItem("priceId", priceID);
      toast({
        title: "Active package",
        description: "Please complete registration process to activate the package",
      });

      router.push("/register");
    }
  };

  return (
    <Card
      className={cn("border-t-4", {
        "border-t-[#F59E0B]": price?.metadata?.name === "Small",
        "border-t-[#10B981]": price?.metadata?.name === "Medium",
        "border-t-[#AA0BF5]": price?.metadata?.name === "Enterprise",
      })}
    >
      <CardHeader>
        <CardTitle>{price.metadata.name} Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-1 space-y-1">
          <h4 className="text-2xl xl:text-3xl">
            {currencySign} {parseFloat((unitAmount / 100).toFixed(2)).toFixed(2)}
          </h4>
          <span>/ {price?.recurring?.interval}</span>
        </div>

        <ul role="list" className="space-y-3 pb-4 pt-6 text-sm leading-6 text-gray-600">
          <li className="flex gap-x-3 text-sm">
            <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
            {price?.metadata?.salesChannels === "-1"
              ? "Unlimited"
              : price?.metadata?.salesChannels}{" "}
            Sales Channels
          </li>
          <li className="flex gap-x-3 text-sm">
            <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
            {price?.metadata?.users === "-1" ? "Unlimited" : price?.metadata?.users} Users
          </li>
          <li className="flex gap-x-3 text-sm">
            <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
            {price?.metadata?.salesVolume === "-1"
              ? "Unlimited"
              : price?.metadata?.salesVolume}{" "}
            Sales Volume
          </li>
          <li className="flex gap-x-3 text-sm">
            <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
            Expert Customer Support
          </li>
          <li className="flex gap-x-3 text-sm">
            <CheckIcon className="size-5 flex-none text-primary" aria-hidden="true" />
            Cancel Anytime
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {price?.id === subscribedPriceId ? (
          <Button className="w-full" type="button">
            Subscribed
          </Button>
        ) : (
          <Button className="w-full" type="button" onClick={() => handleClick(price?.id)}>
            {userInformation?.restrictions?.subscribed ? "Upgrade" : "Get Started"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
