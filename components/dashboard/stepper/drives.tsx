import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PropsType = { handleContinue: () => void };

const cloudContent = [
  {
    id: 1,
    logo: "./images/integrations/google-drive.svg",
    title: "Google Drive",
  },
  {
    id: 2,
    logo: "./images/integrations/drop-box.svg",
    title: "Drop Box",
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

function Drives({ handleContinue }: PropsType) {
  return (
    <div className="relative col-span-2 p-8">
      <h6 className="text-xl font-semibold">
        Which Shipping Carrier do You want to Setup With?
      </h6>
      <p className="text-xs">
        Choose the system you either currently using or you plan to use.
      </p>

      <RadioGroup className="mt-5 grid grid-cols-4 gap-x-5 gap-y-8">
        {cloudContent.map((e) => {
          return <Box key={e.id} {...e} />;
        })}
      </RadioGroup>

      <div className="absolute bottom-8 right-8 my-6">
        <Button variant="dark" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Drives;
