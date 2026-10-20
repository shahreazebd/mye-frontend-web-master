import { Metadata } from "next";

import HomePricing from "@/components/home/home-pricing";
import Testimonial from "@/components/home/testimonial";
import { AutomatedInventoryManagementSystem } from "@/components/integrations/amazon/automated-inventory-management-system";
import Benefit from "@/components/integrations/amazon/benefit";
import BiggestRange from "@/components/integrations/amazon/biggest-range";
import FAQ from "@/components/integrations/amazon/faq";
import Features from "@/components/integrations/amazon/features";
import { ForecastingAndReportingTools } from "@/components/integrations/amazon/forecasting-and-reporting-tools";
import GetStarted from "@/components/integrations/amazon/get-started";
import Hero from "@/components/integrations/amazon/hero";
import { MYECompanionMobileApp } from "@/components/integrations/amazon/mye-companion-mobile-app";
import { OrderManagement } from "@/components/integrations/amazon/order-management";
import { ShippingSolutions } from "@/components/integrations/amazon/shipping-solutions";

export const metadata: Metadata = {
  title: "Multi-Channel E-commerce Fulfilment For Amazon | MYE ",
  description:
    "Manage Your eCommerce is an Amazon seller tool that allows you to Manage your Orders, sync inventories, and ship orders quickly - all from one platform.",
};

function page() {
  return (
    <div>
      <Hero />
      <AutomatedInventoryManagementSystem />
      <OrderManagement />
      <ShippingSolutions />
      <ForecastingAndReportingTools />
      <MYECompanionMobileApp />
      {/* <SecondSection /> */}
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
