import Image from "next/image";

export default function Clients() {
  return (
    <section className="container py-12 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-4">
        <div className="col-span-1 w-full text-center lg:col-span-1 lg:text-left">
          <p className="mb-4 font-bold text-[#0672D3]">The #1 choice since 2014</p>
          <h5 className="font-semibold">
            Trusted by over 12,000 ecommerce businesses and their accountants
          </h5>
        </div>
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 lg:justify-end lg:gap-x-5 xl:gap-x-8">
            <Image
              src="/logos/marketplaces/amazon.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
            <Image
              src="/logos/marketplaces/bigcommerce.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
            <Image
              src="/logos/marketplaces/ebay.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
            <Image
              src="/logos/marketplaces/otto.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
            <Image
              src="/logos/marketplaces/shopify.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
            <Image
              src="/logos/marketplaces/woo.svg"
              alt="..."
              height={32}
              width={100}
              className="size-14 md:size-16 lg:size-20 xl:size-fit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
