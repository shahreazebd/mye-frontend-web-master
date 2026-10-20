import React from "react";
import Image from "next/image";

function ContentBox({ image, content }: { image: string; content: string }) {
  return (
    <div className="mb-4 flex items-start gap-x-2 md:gap-x-3">
      <Image
        src={image}
        alt="icon"
        width={50}
        height={50}
        className="size-4 md:size-6 lg:mt-px"
      />
      <div>
        {/* <h6 className="mb-2 text-sm leading-4 lg:text-[18px] lg:leading-6">{title}</h6> */}
        <p className="text-xs lg:text-base">{content}</p>
      </div>
    </div>
  );
}

function RealTimeReporting3() {
  return (
    <section className="real-time-reporting bg-shippingRatesBg pb-24 pt-12 lg:py-40">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Powerful Business Intelligence
            </h3>
            <Image
              src="/images/features/real-time-reporting.svg"
              alt="manage shipment"
              width={554}
              height={529}
            />
          </div>
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px]  font-bold lg:block">
              Powerful Business Intelligence
            </h3>
            <p className="my-6">
              Leverage our intuitive analytics dashboards to gain clear visibility into
              all key eCommerce metrics from orders and revenue to emerging trends.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Dive into historical performance across products, channels etc."
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Surface insights into customer behaviour patterns"
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Identify opportunities for growth and optimization"
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Data-driven decision making capabilities"
              />
            </div>
            <p className="my-6">
              Harness the power of data analytics to streamline operations, maximise
              profits, and scale your online business with strategic precision. Our robust
              reporting and analytics tools help eCommerce merchants make smart,
              insight-led decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealTimeReporting3;
