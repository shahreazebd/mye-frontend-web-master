import { Metadata } from "next";

import FAQ from "@/components/integrations/amazon/faq";
import CustomisationShipping from "@/components/shipping/customisation-shipping";
import GetStarted from "@/components/shipping/get-started";
import Hero from "@/components/shipping/hero";
import OrderManagement from "@/components/shipping/order-management";
import { OurCommitment } from "@/components/shipping/our-commitment";
import { ShippingIntegrations } from "@/components/shipping/shipping-integrations";
import ShippingRates from "@/components/shipping/shipping-rates";

export const metadata: Metadata = {
  title: "Shipping Software for Multichannel Ecommerce | MYE UK",
  description:
    "Streamline your shipping process with Manage Your eCommerce. Print, manage, schedule, and track all your shipments from one platform. Request a demo today!",
};

export default function Shipping() {
  return (
    <>
      <Hero />
      <OurCommitment />
      <ShippingRates />
      <OrderManagement />
      <CustomisationShipping />
      <ShippingIntegrations />
      <GetStarted />
      <section className="-mb-20 lg:-mb-48">
        <FAQ />
      </section>
    </>
  );
}
