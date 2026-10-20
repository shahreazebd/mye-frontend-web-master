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

function ManageShipment3() {
  return (
    <section className="manage-shipment bg-faqBg py-12 lg:pb-20 lg:pt-24">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="block text-center text-[30px] font-bold lg:hidden">
              Stress-Free Shipping & Fulfilment
            </h3>
            <Image
              src="/images/features/manage-shipment.svg"
              alt="Stress-Free Shipping & Fulfilment"
              width={554}
              height={529}
            />
          </div>
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px]  font-bold lg:block">
              Stress-Free Shipping & Fulfilment
            </h3>
            <p className="my-6">
              Revolutionise your shipping operations through integrations with leading
              carriers including Royal Mail, DPD, UPS, FedEx and more.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Automated label printing and status tracking"
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="One-click ship order management"
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Error prevention through process automation"
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Faster fulfilment times and reduced labour"
              />
            </div>
            <p className="my-6">
              Eliminate manual processes and accelerate your logistics with our seamless
              shipping capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageShipment3;
