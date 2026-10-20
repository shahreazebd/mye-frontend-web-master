import { Metadata } from "next";

import PostageWrapper from "@/components/legacy-postage/postage-wrapper";

export const metadata: Metadata = {
  title: "Postage",
  description: "Authentication forms built using the components.",
};

export default function Postage() {
  return <PostageWrapper />;
}
