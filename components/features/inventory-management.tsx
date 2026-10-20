import Image from "next/image";

function ContentBox({ image, content }: { image: string; content: string }) {
  return (
    <div className="mb-4 flex items-start gap-x-2 md:gap-x-3">
      <Image
        src={image}
        alt="icon"
        width={50}
        height={50}
        className="size-4 md:size-6 lg:mt-[2px]"
      />
      <div>
        {/* <h6 className="mb-2 text-sm leading-4 lg:text-[18px] lg:leading-6">{title}</h6> */}
        <p className="text-xs lg:text-base">{content}</p>
      </div>
    </div>
  );
}

function InventoryManagement() {
  return (
    <section className="py-12 lg:pb-8 lg:pt-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="mx-auto lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Inventory Management Software
            </h3>
            <Image
              src="/images/features/inventory-management.svg"
              alt="inventory-management"
              width={554}
              height={529}
            />
          </div>
          <div>
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Inventory Management Software
            </h3>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Take command of your inventory in real-time, ensuring crystal-clear visibility of stock levels at all times. Inventory gets updated instantly across all your sales channels, so you can keep stocks, variations and bundles up- to-date automatically. Provides real-time inventory control, enabling you to have a clear overview of your stock levels and avoid stockout or overstocking."
              />
              <ContentBox
                image="/images/features/icon-2.svg"
                content="By keeping track of inventory across all your sales channels, you can optimize your supply chain, improve fulfillment efficiency, and enhance customer satisfaction."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryManagement;
