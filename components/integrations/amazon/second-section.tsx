import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../../ui/button";

function ContentBox({
  image,
  content,
  title,
}: {
  image: string;
  content: string;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-x-3 md:gap-x-4">
      <Image
        src={image}
        alt="icon"
        width={50}
        height={50}
        className="mt-2 size-7 md:size-10 lg:mt-0"
      />
      <div>
        <h6 className="mb-2 text-[18px] leading-6 lg:text-[22px]">{title}</h6>
        <p className="text-xs lg:text-base">{content}</p>
      </div>
    </div>
  );
}

function SecondSection() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <Image
              src="/images/single-integration/feature.svg"
              alt="feature"
              width={554}
              height={529}
            />
          </div>
          <div className="order-2 lg:order-1">
            <div className="lg:mr-36">
              <ContentBox
                title="Multichannel Inventory Management"
                image="/images/single-integration/icon-1.svg"
                content="Inventory management solution that gives you full control of your whole inventory – track stocks accurately regardless of how many sales channels you integrate."
              />
              <ContentBox
                title="Realtime Order Management"
                image="/images/single-integration/icon-2.svg"
                content="Manage all your orders from all your sales channels you sell on in realtime, sync inventory across, and cycle stock – all from an easy-to-use single dashboard."
              />
              <ContentBox
                title="Shipping Solution"
                image="/images/single-integration/icon-3.svg"
                content="Easily ship single or bulk orders with Royal Mail from all your sales channels to save time and reduce human errors. This will speed up your order fulfilment time. "
              />
              <ContentBox
                title="Forecasting and Reporting Tools"
                image="/images/single-integration/icon-1.svg"
                content="Help your business grow by having full visibility with the powerful reporting tools that give you full visibility of data across all selling channels."
              />
            </div>
            <Link href="/register">
              <Button variant="secondary" className="mt-8 text-[11px] md:text-base">
                Get Started{" "}
                <span className="ml-3">
                  <ArrowRightCircle size={15} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
