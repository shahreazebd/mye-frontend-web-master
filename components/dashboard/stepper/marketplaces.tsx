import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import AddChannel from "./add-channel";

type PropsType = {
  handleContinue: () => void;
};

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
  },
  {
    id: 3,
    logo: "./images/integrations/shopify.svg",
    title: "Shopify",
  },
  {
    id: 4,
    logo: "./images/integrations/otto.svg",
    title: "Otto",
  },
  {
    id: 5,
    logo: "./images/integrations/big-commerce.svg",
    title: "Big Commerce",
  },
  {
    id: 6,
    logo: "./images/integrations/woocommerce.svg",
    title: "Woo Commerce",
  },
];

function Box({ logo, title }: { logo: string; title: string }) {
  return (
    <label
      className="stepper rounded-md border border-[#FAFAFA] px-3 pb-7 pt-2"
      htmlFor={title}
    >
      <input type="radio" name="marketplace" id={title} />
      <div className="mx-auto mt-4 flex h-[50px] w-[100px] items-center">
        <Image src={logo} alt="company-logo" width={100} height={100} />
      </div>
      <p className="mt-5 text-center text-[17px] font-bold">{title}</p>
    </label>
  );
}

function Marketplaces({ handleContinue }: PropsType) {
  const [isNext, setIsNext] = useState(false);

  return (
    <div className="col-span-2 p-8">
      {!isNext ? (
        <>
          {" "}
          <h6 className="text-xl font-semibold">
            Which Store do You want to Setup With?
          </h6>
          <p className="text-xs">
            Choose the system you either currently using or you plan to use.
          </p>
          <div className="mt-5 grid grid-cols-4 gap-x-5 gap-y-8">
            {marketplacesContent.map((e) => {
              return <Box key={e.id} {...e} />;
            })}
          </div>
          <div className="my-6 flex justify-end">
            <Button variant="dark" onClick={() => setIsNext(true)}>
              Continue
            </Button>
          </div>
        </>
      ) : (
        <AddChannel handleContinue={handleContinue} setIsNext={setIsNext} />
      )}
    </div>
  );
}

export default Marketplaces;
