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

function InventoryManagement3() {
  return (
    <section className="py-12 lg:pb-8 lg:pt-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="mx-auto lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Automated Inventory Tracking
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
              Automated Inventory Tracking
            </h3>
            <p className="my-6">
              Get complete visibility and control over inventory across multiple sales
              channels via real-time tracking and updates.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Instantly synchronise stock levels to prevent overselling"
              />
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Intelligent alerts for reorders and inventory transfers"
              />
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Detailed reporting and analytics for forecasting"
              />
            </div>
            <p className="my-6">
              Eliminate stockouts and write-offs with our robust automated inventory
              management capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryManagement3;
