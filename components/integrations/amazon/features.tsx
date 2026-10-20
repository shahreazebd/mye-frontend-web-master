import Image from "next/image";

function ContentBox({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <Image
        src={image}
        alt="icon"
        width={70}
        height={70}
        className="size-10 md:size-20"
      />

      <h6 className="my-1 text-[18px] lg:my-4">{title}</h6>
      <p className="text-sm lg:text-[18px]">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="container grid gap-y-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4 lg:py-20 xl:gap-x-10">
      <ContentBox
        image="/images/single-integration/feature-2.svg"
        title="Order Management"
        description="Manage all your sales channel orders in one easy-to-use dashboard."
      />

      <ContentBox
        image="/images/single-integration/feature-4.svg"
        title="Inventory Management"
        description="Accurate real-time inventory data across all of your sales channels, in one dashboard."
      />

      <ContentBox
        image="/images/single-integration/feature-1.svg"
        title="Shipping Software"
        description="Import, manage, and bulk ship orders to reduce human errors and save time."
      />

      <ContentBox
        image="/images/single-integration/feature-3.svg"
        title="Real-time Reporting "
        description="Generate sales, SKU and inventory reports and forecasts for the future."
      />
    </section>
  );
}

export default Features;
