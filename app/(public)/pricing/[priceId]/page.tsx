import { Metadata } from "next";

import { SinglePrice } from "@/components/pricing/single-price";

export const metadata: Metadata = {
  title: "Price | Manage Your E-commerce",
  description: "Price page",
};

export default async function SinglePricePage(props: PageProps<"/pricing/[priceId]">) {
  const { priceId } = await props.params;
  return (
    <section className="container my-20 flex justify-center">
      <SinglePrice priceId={priceId} />
    </section>
  );
}
