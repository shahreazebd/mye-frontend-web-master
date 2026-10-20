import { Metadata } from "next";

import CallbackAmazon from "@/components/callback/amazon";

export const metadata: Metadata = {
  title: "Amazon Success",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function AmazonSuccess() {
  return <CallbackAmazon />;
}
