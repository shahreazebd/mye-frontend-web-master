import { Metadata } from "next";

import OpenOrdersWrapper from "@/components/order/legacy-open-orders/open-orders-wrapper";

export const metadata: Metadata = {
  title: "Legacy Open Orders",
  description: "Authentication forms built using the components.",
};

export default function OpenOrder() {
  return <OpenOrdersWrapper />;
}
