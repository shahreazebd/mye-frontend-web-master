import type { Metadata } from "next";

import TrackOrdersWrapper from "@/components/order/track-orders/track-orders-wrapper";

export const metadata: Metadata = {
  title: "Track Orders",
  description: "Authentication forms built using the components.",
};

export default function TrackOrdersPage() {
  return <TrackOrdersWrapper />;
}
