import { Metadata } from "next";

import OrphanProductsWrapper from "@/components/orphan-products/wrapper";

export const metadata: Metadata = {
  title: "Orphan Products",
  description: "Authentication forms built using the components.",
};

export default function OrphanProducts() {
  return <OrphanProductsWrapper />;
}
