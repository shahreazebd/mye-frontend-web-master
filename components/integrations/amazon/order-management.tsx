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

export function OrderManagement() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Order Management
            </h3>
            <p className="my-6">
              Streamline your order management process with our Real-Time Order Management
              system. Manage orders from all your sales channels in one place, syncing
              inventory levels Across all marketplaces in real-time. Whether you’re
              processing orders from Amazon, Shopify, Woocommerce, ETSY, or other
              marketplaces, our system ensures you stay on top of your orders, reducing
              delays and boosting customer satisfaction. Our user-friendly interface
              allows you to update order statuses, cycle stock, and communicate with
              customers effortlessly—all from a single, easy-to-use dashboard.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Import orders from any platform to initiate production or fulfillment of a product."
              />
              <ContentBox
                content="Update synched ecommerce platforms with accurate inventory quantities."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                content="Handle large numbers of orders without missing a beat"
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                content="Generate advanced reports manually or automatically for any productReal-time inventory counts with postage tracking throughout the entire workflow process"
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Order Management
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
