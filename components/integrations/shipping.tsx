import React from "react";

import ContentBox from "./content-box";

const shipingContent = [
  {
    id: 1,
    logo: "./images/integrations/dhl.svg",
    title: "DHL",
    location: "dhl",
  },
  {
    id: 2,
    logo: "./images/integrations/evri.svg",
    title: "Evri",
    location: "evri",
  },
  {
    id: 3,
    logo: "./images/integrations/royal-mail.svg",
    title: "Royal mail",
    location: "royal-mail",
  },
  {
    id: 4,
    logo: "./images/integrations/ups.svg",
    title: "UPS",
    location: "",
  },
  {
    id: 5,
    logo: "./images/integrations/dpd.svg",
    title: "DPD",
    location: "",
  },
  {
    id: 6,
    logo: "./images/integrations/fedex.svg",
    title: "Fedex",
    location: "",
  },
];

function Shipping() {
  return (
    <section className="container relative z-20 pt-20">
      <h5 className="text-xl lg:text-[35px]">Shipping</h5>
      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-5 xl:gap-x-14 xl:gap-y-16">
        {shipingContent.map((e) => {
          return <ContentBox key={e.id} {...e} />;
        })}
      </div>
    </section>
  );
}

export default Shipping;
