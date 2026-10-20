import { Metadata } from "next";

import HomePricing from "@/components/home/home-pricing";
import Testimonial from "@/components/home/testimonial";
import CompareFeature from "@/components/pricing/compare-feature";
import Faq3 from "@/components/pricing/faq3";
import GetStarted from "@/components/pricing/get-started";
import Hero from "@/components/pricing/hero";

export const metadata: Metadata = {
  title: "Price | Manage Your E-commerce",
  description: "Price page",
};

function Page() {
  return (
    <>
      <Hero />
      <CompareFeature />
      <HomePricing />
      <Faq3 />
      <GetStarted />
      <Testimonial />
    </>
  );
}

export default Page;
