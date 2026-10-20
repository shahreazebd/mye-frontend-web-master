import { Metadata } from "next";

import { CallbackTiktok } from "@/components/callback/tiktok";

export const metadata: Metadata = {
  title: "Tiktok Integration",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function TiktokIntegration() {
  return <CallbackTiktok />;
}
