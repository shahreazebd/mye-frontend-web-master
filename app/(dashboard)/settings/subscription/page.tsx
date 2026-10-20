import { Metadata } from "next";

import SubscriptionWrapper from "@/components/settings/subscription/subscription-wrapper";

export const metadata: Metadata = {
  title: "Subscription",
};

export default function Subscription() {
  return <SubscriptionWrapper />;
}
