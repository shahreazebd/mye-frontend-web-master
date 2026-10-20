import Image from "next/image";

function ContentBox(props: { image: string; content: string; title: string }) {
  const { image, content, title } = props;

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
        <p className="text-xs lg:text-base">
          <strong className="text-sm leading-4 lg:text-[16px] lg:leading-6">
            {title}
          </strong>

          {content}
        </p>
      </div>
    </div>
  );
}

export function IntegratedShippingSolutions() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Integrated Shipping Solutions
            </h3>
            <p className="my-6">
              Shipping is a pivotal component of the e-commerce experience, and our
              Integrated Shipping Solutions are designed to make it as efficient as
              possible. Connect with many courier services, automate the delivering
              process, and reduce errors to ensure accurate deliveries for your customers.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                title="Extensive Carrier Integration: "
                content="Access a wide array of shipping carriers, including DHL, FedEx, Royal Mail, DPD,EVRI, UPS, and more."
              />
              <ContentBox
                title="Automated Shipping Processes: "
                content="Save time by automating repetitive tasks like label generation and order routing."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Error Minimization:"
                content=" Reduce shipping errors through precise and automated processes."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Real-Time Tracking Updates: "
                content="Provide customers with up-to-the-minute tracking information to keep them informed about their orders."
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                title="Customizable Shipping Rules: "
                content="Design shipping rules that cater to your business needs, optimizing shipping based on demand and other criteria."
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Integrated Shipping Solutions
            </h3>
            <Image
              src="/images/features/manage-shipment.svg"
              alt="manage-shipment"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
