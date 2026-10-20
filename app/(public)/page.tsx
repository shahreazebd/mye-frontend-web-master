import { Metadata } from "next";

import EasiestInventory from "@/components/home/easiest-inventory";
import GetStarted from "@/components/home/get-started";
import Home3 from "@/components/home/home3";
import HomePricing from "@/components/home/home-pricing";
import Testimonial from "@/components/home/testimonial";

export const metadata: Metadata = {
  title: "Order & Inventory management better, ship faster, message easier",
  description:
    "Optimize your business growth with effortless Order & Inventory management, centralized orders & messaging solution.",
};

export default function Home() {
  return (
    <>
      <Home3 />
      <EasiestInventory />
      <GetStarted />
      <Testimonial />
      <HomePricing />
    </>
  );
}
