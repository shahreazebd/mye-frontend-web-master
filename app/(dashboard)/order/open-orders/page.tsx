import { Metadata } from "next";

import OpenOrdersWrapper from "@/components/order/open-orders/open-orders-wrapper";

export const metadata: Metadata = {
  title: "Open Orders",
  description: "Authentication forms built using the components.",
};

export default function OpenOrder() {
  return <OpenOrdersWrapper />;
}
