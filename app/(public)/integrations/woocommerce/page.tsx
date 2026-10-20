import React from "react";
import { Metadata } from "next";

import HomePricing from "@/components/home/home-pricing";
import Testimonial from "@/components/home/testimonial";
import Benefit from "@/components/integrations/amazon/benefit";
import BiggestRange from "@/components/integrations/amazon/biggest-range";
import FAQ from "@/components/integrations/amazon/faq";
import Features from "@/components/integrations/amazon/features";
import SecondSection from "@/components/integrations/amazon/second-section";
import GetStarted from "@/components/integrations/woocommerce/get-started";
import Hero from "@/components/integrations/woocommerce/hero";

export const metadata: Metadata = {
  title: "Multi-Channel E-commerce Fulfilment For WooCommerce | MYE",
  description:
    "Manage Your eCommerce is a WooCommerce seller tool that allows you to Manage your Orders, sync inventories, and ship orders quickly - all from one platform.",
};

function page() {
  return (
    <div>
      <Hero />
      <SecondSection />
      <Benefit />
      <Features />
      <BiggestRange />
      <GetStarted />
      <Testimonial />
      <HomePricing />
      <section className="-mb-20 lg:-mb-48">
        <FAQ />
      </section>
    </div>
  );
}

export default page;
