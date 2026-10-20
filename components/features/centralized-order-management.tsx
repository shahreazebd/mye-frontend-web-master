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

export function CentralizedOrderManagement() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Centralized Order Management
            </h3>
            <p className="my-6">
              Navigating the complexities of managing orders across various sales channels
              can be overwhelming. Our Centralized Order Management system consolidates
              this process, allowing you to oversee all your orders from a single, unified
              dashboard. No matter where your customers are shopping—whether on Amazon,
              eBay, WooCommerce, or other platforms—you can easily track the status of
              each order in real-time, send automated notifications to customers, and
              ensure prompt fulfillment.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                title="Unified Multi-Channel Integration: "
                content="Seamlessly combine orders from all sales channels into one easy to use dashboard."
              />
              <ContentBox
                title="Real-Time Order Visibility: "
                content="Monitor every step of the order process, from placement to delivery, with real-time tracking."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Automated Notifications: "
                content="Keep your customers informed throughout the fulfillment process with timely, automated updates."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Streamlined Fulfillment: "
                content="Enhance order processing and dispatch efficiency to ensure orders are handled swiftly and accurately."
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                title="Automated Stock Updates: "
                content="Automatically adjust inventory levels for failed purchases and reserved products."
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Centralized Order Management
            </h3>
            <Image
              src="/images/features/order-management.svg"
              alt="order-management"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
