import { Metadata } from "next";

import CallbackEbay from "@/components/callback/ebay";

export const metadata: Metadata = {
  title: "Ebay Success",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function EbaySuccess() {
  return <CallbackEbay />;
}
