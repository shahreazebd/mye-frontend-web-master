import { Metadata } from "next";

import { PostagePreviewWrapper } from "@/components/order/open-orders/postage-preview/postage-preview-wrapper";
import { ShipmentSocketProvider } from "@/components/shipment-socket-provider";

export const metadata: Metadata = {
  title: "Postage Preview",
  description: "Authentication forms built using the components.",
};

export default function PostagePreview() {
  return (
    <ShipmentSocketProvider>
      <PostagePreviewWrapper />
    </ShipmentSocketProvider>
  );
}
