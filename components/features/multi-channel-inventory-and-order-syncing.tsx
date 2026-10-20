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

export function MultiChannelInventoryAndOrderSyncing() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Multi-Channel Inventory and Order Syncing
            </h3>
            <p className="my-6">
              Managing inventory and orders across multiple platforms can be challenging,
              but with ManageYourEcommerce, it’s a breeze. Our Multi-Channel Syncing
              feature ensures your inventory levels and order statuses are consistently
              updated across all sales channels, preventing overselling and enabling you
              to fulfill orders without delays.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                title="Real-Time Data Syncing: "
                content="Keep inventory and order data synchronized in real-time across all your sales channels."
              />
              <ContentBox
                title="Bulk Product Listing and Updates: "
                content="Easily list products across multiple platforms and make bulk updates to save time and minimize errors."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Accurate Inventory Management: "
                content="Maintain consistent and accurate inventory levels across all platforms, preventing stockouts and overselling."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Unified Order Management: "
                content="Handle and fulfill orders from all sales channels within one centralized system."
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Integrated Shipping Solutions
            </h3>
            <Image
              src="/images/features/smart-communication.svg"
              alt="smart-communication"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
