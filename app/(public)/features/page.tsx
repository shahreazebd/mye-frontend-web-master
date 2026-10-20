import { Metadata } from "next";

import { AdvancedInventoryManagement } from "@/components/features/advanced-inventory-management";
import { CentralizedOrderManagement } from "@/components/features/centralized-order-management";
import { CustomizableAutomationRules } from "@/components/features/customizable-automation-rules";
import { Faq } from "@/components/features/faq";
import Features3 from "@/components/features/features3";
import { Hero } from "@/components/features/hero";
import { IntegratedShippingSolutions } from "@/components/features/integrated-shipping-solutions";
import { MobileAppForOnTheGoManagement } from "@/components/features/mobile-app-for-on-the-go-management";
import { MultiChannelInventoryAndOrderSyncing } from "@/components/features/multi-channel-inventory-and-order-syncing";
import { PowerfulReportingAndAnalytics } from "@/components/features/powerful-reporting-and-analytics";
import { SeamlessIntegrationWithLeadingPlatforms } from "@/components/features/seamless-integration-with-leading-platforms";
import EasiestInventory from "@/components/home/easiest-inventory";
import GetStarted from "@/components/home/get-started";

export const metadata: Metadata = {
  title: "Features",
  description: "Authentication forms built using the components.",
};

export default function Features() {
  return (
    <>
      <Hero />
      <Features3 />
      <CentralizedOrderManagement />
      <AdvancedInventoryManagement />
      <IntegratedShippingSolutions />
      <PowerfulReportingAndAnalytics />
      <MultiChannelInventoryAndOrderSyncing />
      <CustomizableAutomationRules />
      <MobileAppForOnTheGoManagement />
      <SeamlessIntegrationWithLeadingPlatforms />

      {/* <InventoryManagement3 />
      <ManageShipment3 />
      <SmartCommunication3 /> */}
      {/* <RealTimeReporting3 /> */}
      <Faq />
      <EasiestInventory />
      <GetStarted />
    </>
  );
}
