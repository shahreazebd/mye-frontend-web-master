import { Metadata } from "next";

import ShippingCarrierWrapper from "@/components/settings/shipping-carriers/shipping-carriers-wrapper";

export const metadata: Metadata = {
  title: "All Shipping Carriers",
  description: "Authentication forms built using the components.",
};

export default function ShippingCarrier() {
  return <ShippingCarrierWrapper />;
}
