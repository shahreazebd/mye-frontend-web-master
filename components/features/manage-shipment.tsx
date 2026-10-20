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

function ManageShipment() {
  return (
    <section className="manage-shipment bg-faqBg py-12 lg:pb-20 lg:pt-24">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="block text-center text-[30px] font-bold lg:hidden">
              Manage Shipment
            </h3>
            <Image
              src="/images/features/manage-shipment.svg"
              alt="manage shipment"
              width={554}
              height={529}
            />
          </div>
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px]  font-bold lg:block">
              Manage Shipment
            </h3>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Our platform seamlessly integrates with major third-party shipping carriers such as Royal Mail, EVRI ,DPD, DHL , FedEx, and UPS. This integration streamlines the shipping label buying process, automating repetitive tasks, and amplifying operational efficiency."
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="As a result, this reduces the chances of human errors and increases customer satisfaction."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageShipment;
