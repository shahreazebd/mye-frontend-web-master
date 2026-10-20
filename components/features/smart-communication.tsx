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

function SmartCommunication() {
  return (
    <section className="py-12 lg:pb-12 lg:pt-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Smart Communication
            </h3>
            <Image
              src="/images/home/smartCommunication.svg"
              alt="smart communication"
              width={554}
              height={529}
            />
          </div>
          <div>
            <h3 className="mb-8 hidden text-[40px]  font-bold lg:block">
              Smart Communication
            </h3>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Experience the convenience of centralizing all your cross-marketplace customer messages into one intuitive inbox. You will never have to leave our platform to respond to messages. Our cutting-edge marketplace messaging functionality with prebuilt templates and AI functionality establishes seamless communication, fostering trust and elevating overall customer satisfaction."
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Real-time interaction without having to switch various marketplace empowers you to address customer queries promptly, building strong and enduring relationships with your valuable customers."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartCommunication;
