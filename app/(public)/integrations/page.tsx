import { Metadata } from "next";

import Cloud from "@/components/integrations/cloud";
import ExploreIntegrations from "@/components/integrations/explore-integrations";
import Hero from "@/components/integrations/hero";
import Marketplaces from "@/components/integrations/marketplaces";
import Messaging from "@/components/integrations/messaging";
import Shipping from "@/components/integrations/shipping";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Authentication forms built using the components.",
};

export default function Integrations() {
  return (
    <>
      <Hero />
      <ExploreIntegrations />
      <Shipping />
      <Marketplaces />
      <Messaging />
      <Cloud />
    </>
  );
}
