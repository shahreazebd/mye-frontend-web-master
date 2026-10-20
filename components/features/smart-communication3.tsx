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

function SmartCommunication3() {
  return (
    <section className="py-12 lg:pb-12 lg:pt-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Unified Messaging Inbox
            </h3>
            <Image
              src="/images/home/smartCommunication.svg"
              alt="Unified Messaging Inbox"
              width={554}
              height={529}
            />
          </div>
          <div>
            <h3 className="mb-8 hidden text-[40px]  font-bold lg:block">
              Unified Messaging Inbox
            </h3>
            <p className="my-6">
              Forge meaningful customer relationships and deliver prompt support through
              our integrated messaging system.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Combining conversations from all sales channels for unified communication"
              />
              <ContentBox
                image="/images/features/icon-1.svg"
                content="AI-powered suggestions to assist with quick, relevant responses"
              />
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Optimised response time and superior post-purchase experience"
              />
              <p className="my-6">
                Answer customer queries faster and build trust through our streamlined
                messaging feature. Real-time interaction empowers you to address customer
                queries promptly, building strong and enduring relationships with your
                valuable customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartCommunication3;
