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

export function AutomatedInventoryManagementSystem() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Automated Inventory Management System
            </h3>
            <p className="my-6">
              Take full control of your Amazon and FBA inventory with our sophisticated
              Automated Inventory Management System. This powerful tool centralizes all
              your inventory data into a single, responsive dashboard, making it easy to
              manage stock levels, update listings, and monitor performance. Our system is
              designed to simplify inventory management, ensuring your products are always
              in stock and operations run smoothly. With integrated shipping options like
              Royal Mail, FedEx, DHL,UPS, Evri and DPD etc. you can handle the entire
              order fulfillment process efficiently, saving time and minimizing human
              error.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                content="Real time stock update with actionable history breakdowns stock has been updated."
              />
              <ContentBox
                content="Track your sales across every marketplace"
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                content="Identify your best selling products."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                content="Stock threshold provides you advance control over your inventory."
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="Subscribe and get instant push notifications on stock changes, available via browser or mobile app"
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="Supports various types of products ( Simple, Group, Combo )"
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Automated Inventory Management System
            </h3>
            <Image
              src="/images/features/inventory-management.svg"
              alt="inventory-management"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
