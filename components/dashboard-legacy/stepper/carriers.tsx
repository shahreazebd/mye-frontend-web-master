import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import AddCarrier from "./add-carrier";

type PropsType = { handleContinue: () => void };

const carriers = [
  {
    id: 1,
    logo: "./images/integrations/ups.svg",
    title: "UPS",
  },
  {
    id: 2,
    logo: "./images/integrations/dpd.svg",
    title: "DPD",
  },
  {
    id: 3,
    logo: "./images/integrations/fedex.svg",
    title: "Fedex",
  },
  {
    id: 4,
    logo: "./images/integrations/dhl.svg",
    title: "DHL",
  },
  {
    id: 5,
    logo: "./images/integrations/evri.svg",
    title: "Evri",
  },
  {
    id: 5,
    logo: "./images/integrations/royal-mail.svg",
    title: "Royal Mail",
  },
];

function Box({ logo, title }: { logo: string; title: string }) {
  return (
    <div className="rounded-md border border-[#FAFAFA] px-3 pb-7 pt-2">
      <RadioGroupItem value={title} id={title} />
      <Label htmlFor={title}>
        <Image
          src={logo}
          alt="company-logo"
          width={100}
          height={100}
          className="mx-auto size-20"
        />
        <p className="mt-5 text-center text-[17px] font-bold">{title}</p>
      </Label>
    </div>
  );
}

function Carriers({ handleContinue }: PropsType) {
  const [isNext, setIsNext] = useState(false);

  return (
    <div className="col-span-2 p-8">
      {!isNext ? (
        <>
          <h6 className="text-xl font-semibold">
            Which Shipping Carrier do You want to Setup With?
          </h6>
          <p className="text-xs">
            Choose the system you either currently using or you plan to use.
          </p>

          <RadioGroup className="mt-5 grid grid-cols-4 gap-x-5 gap-y-8">
            {carriers.map((e) => {
              return <Box key={e.id} {...e} />;
            })}
          </RadioGroup>

          <div className="my-6 flex justify-end">
            <Button variant="dark" onClick={() => setIsNext(true)}>
              Continue
            </Button>
          </div>
        </>
      ) : (
        <AddCarrier handleContinue={handleContinue} setIsNext={setIsNext} />
      )}
    </div>
  );
}

export default Carriers;
