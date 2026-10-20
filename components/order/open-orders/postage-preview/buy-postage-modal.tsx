import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getInitials } from "@/utils/helpers";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import DhlOptions from "../options/dhl/dhl-options";
import EvriOptions from "../options/evri/evri-options";
import FedexOptions from "../options/fedex/fedex-options";
import RoyalMailOptions from "../options/royal-mail/royal-mail-options";

export function BuyPostageModalNew({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (val: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const carrier = searchParams.get("carrier") || "EVRI";

  const comps: Record<string, ReactNode> = {
    clickanddrop: <RoyalMailOptions />,
    royal_mail: <RoyalMailOptions />,
    dhl: <DhlOptions />,
    evri: <EvriOptions />,
    fedex: <FedexOptions />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          ["royal_mail", "clickanddrop"].includes(carrier.toLowerCase())
            ? "w-[80vw]"
            : "w-[700px]"
        )}
      >
        <DialogHeader>
          <DialogTitle>
            <section className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={`/logos/carriers/round/${carrier.toLowerCase()}.svg`}
                  height={80}
                  width={80}
                  alt={carrier}
                />
                <AvatarFallback>{getInitials(carrier)}</AvatarFallback>
              </Avatar>
              <p className="ml-2 text-center text-sm font-bold">
                {carrier.toUpperCase()}{" "}
              </p>
            </section>
          </DialogTitle>
        </DialogHeader>

        <section className="max-h-[80vh] overflow-y-scroll p-4">
          {comps[carrier.toLowerCase()]}
        </section>
      </DialogContent>
    </Dialog>
  );
}
