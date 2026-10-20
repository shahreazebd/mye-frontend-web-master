import Image from "next/image";

const marketplacesContent = [
  {
    id: 1,
    logo: "/images/integrations/amazon.svg",
  },
  {
    id: 2,
    logo: "/images/integrations/ebay.svg",
  },

  {
    id: 4,
    logo: "/images/integrations/otto.svg",
  },

  {
    id: 6,
    logo: "/images/integrations/woocommerce.svg",
    title: "WooCommerce",
  },
];

function Box({ logo }: { logo: string }) {
  return (
    <div className="mx-auto flex w-[70px] items-center rounded-md bg-white md:h-[70px] md:w-[200px]">
      <Image
        src={logo}
        alt="company-logo"
        width={100}
        height={100}
        className="mx-auto size-8 md:size-20"
      />
    </div>
  );
}

function Benefit() {
  return (
    <section className="bg-shippingRatesBg pb-32 pt-12 lg:pb-24 lg:pt-16">
      <div className="container">
        <h4 className="mb-3 text-center text-xl">
          Multichannel Inventory Management Software
        </h4>
        <h4 className="mx-auto w-11/12 text-center text-[26px] leading-[50px] lg:text-[41px]">
          Track stock levels across all your sales channels. <br />
          <span className="text-newPrimary">
            Connect All your Marketplaces and Multichannel to sync and update your Stock
            in real time
          </span>
        </h4>

        <div className="mx-auto mt-10 grid grid-cols-3 items-center justify-center gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-10 xl:w-10/12">
          {marketplacesContent.map((e) => {
            return <Box key={e.id} logo={e.logo} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Benefit;
