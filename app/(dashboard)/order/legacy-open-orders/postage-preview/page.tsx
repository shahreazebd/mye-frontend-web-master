import { Metadata } from "next";

// import { AmazonWsProvider } from "@/components/order/open-orders/postage-preview/amazon-ws-provider";
import { PostagePreviewWrapper } from "@/components/order/legacy-open-orders/postage-preview/postage-preview-wrapper";
import { SocketProvider } from "@/components/socket-provider";

export const metadata: Metadata = {
  title: "Postage Preview",
  description: "Authentication forms built using the components.",
};

export default function PostagePreview() {
  return (
    <SocketProvider>
      <PostagePreviewWrapper />
    </SocketProvider>
  );
}
