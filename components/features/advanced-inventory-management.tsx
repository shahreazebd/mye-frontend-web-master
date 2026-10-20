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

export function AdvancedInventoryManagement() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Advanced Inventory Management
            </h3>
            <p className="my-6">
              Maintaining optimal inventory levels is crucial for the success of any
              e-commerce business. Our Advanced Inventory Management tools give you the
              power to efficiently manage stock levels, ensuring you never run out or
              overstock on products. Monitor inventory across multiple locations, forecast
              demand with precision, and automate restocking processes with ease.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                title="Real-Time Inventory Syncing: "
                content="Ensure your inventory levels are consistently updated across all sales channels to avoid overselling and stockouts."
              />
              <ContentBox
                title="Multi-Location Inventory Control: "
                content="Oversee inventory across several warehouses and fulfillment centers from one centralized dashboard."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Automated Stock Replenishment: "
                content="Set up automatic alerts and generate purchase orders to keep your inventory levels optimized."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Data-Driven Demand Forecasting: "
                content="Leverage insights to predict future demand and refine your inventory strategy."
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Advanced Inventory Management
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
