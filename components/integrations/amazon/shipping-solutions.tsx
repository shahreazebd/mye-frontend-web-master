import Image from "next/image";

function ContentBox(props: { image: string; content: string }) {
  const { image, content } = props;

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
        <p className="text-xs lg:text-base">{content}</p>
      </div>
    </div>
  );
}

export function ShippingSolutions() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Shipping Solutions
            </h3>
            <p className="my-6">
              Optimize your shipping operations with our comprehensive Shipping Solutions.
              Our platform supports seamless integration with multiple shipping carriers,
              including <strong>DHL</strong>, <strong>FedEx</strong>,<strong>EVRI</strong>
              , <strong>Royal Mail</strong>, <strong>DPD</strong>, <strong>UPS</strong>,
              and <strong>Amazon Shipping</strong> (coming soon). Ship both single and
              bulk orders directly from your sales channels with ease. By automating
              shipping tasks and providing accurate shipping rates, our system minimizes
              errors and speeds up the fulfillment process. Plus, you’ll have access to
              real-time tracking information, keeping both you and your customers informed
              about the status of orders.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Easily generate postage and shipping labels with just a few clicks"
              />

              <ContentBox
                content="Speed up order dispatch to enhance customer satisfaction"
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="Set flexible routing rules to match changing demand"
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Shipping Solutions
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
