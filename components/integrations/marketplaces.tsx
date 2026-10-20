import React from "react";

import ContentBox from "./content-box";

const marketplacesContent = [
  {
    id: 1,
    logo: "./images/integrations/amazon.svg",
    title: "Amazon",
    location: "amazon",
  },
  {
    id: 2,
    logo: "./images/integrations/ebay.svg",
    title: "eBay",
    location: "ebay",
  },
  {
    id: 3,
    logo: "./images/integrations/otto.svg",
    title: "Otto",
    location: "otto",
  },
  {
    id: 4,
    logo: "./images/integrations/woocommerce.svg",
    title: "WooCommerce",
    location: "woo-commerce",
  },
  {
    id: 5,
    logo: "./images/integrations/shopify.svg",
    title: "Shopify",
    location: "shopify",
  },
  {
    id: 6,
    logo: "./images/integrations/big-commerce.svg",
    title: "Big Commerce",
    location: "big-commerce",
  },
];

function Marketplaces() {
  return (
    <section className="container pt-20">
      <h5 className="text-xl lg:text-[35px]">Marketplaces</h5>
      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-5 xl:gap-x-14 xl:gap-y-16">
        {marketplacesContent.map((e) => {
          return <ContentBox key={e.id} {...e} />;
        })}
      </div>
    </section>
  );
}

export default Marketplaces;
