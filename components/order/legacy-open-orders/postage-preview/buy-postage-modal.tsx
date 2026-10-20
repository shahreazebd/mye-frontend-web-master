import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { usePostageAtom } from "@/atoms/postageAtom";
import { getInitials } from "@/utils/helpers";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import DhlOptions from "../options/dhl/dhl-options";
import EvriOptions from "../options/evri/evri-options";
import FedexOptions from "../options/fedex/fedex-options";
import RoyalMailOptions from "../options/royal-mail/royal-mail-options";

export function BuyPostageModal() {
  const { postageInfo, setPostageInfo } = usePostageAtom();

  const searchParams = useSearchParams();
  const carrier = searchParams.get("carrier") || "evri";

  const handelModal = () => {
    setPostageInfo((prev) => {
      return {
        ...prev,
        isBuyPostageModalOpen: false,
      };
    });
  };

  const comps: Record<string, ReactNode> = {
    clickanddrop: <RoyalMailOptions />,
    dhl: <DhlOptions />,
    evri: <EvriOptions />,
    fedex: <FedexOptions />,
  };

  return (
    <Dialog open={postageInfo?.isBuyPostageModalOpen} onOpenChange={handelModal}>
      <DialogContent
        className={cn(carrier === "clickanddrop" ? "w-[80vw]" : "w-[700px]")}
      >
        <DialogHeader>
          <DialogTitle>
            <section className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={`/logos/carriers/round/${carrier}.svg`}
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

        <section className="max-h-[80vh] overflow-y-scroll p-4">{comps[carrier]}</section>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <span className="text-xl font-semibold text-blue-800">
                    ( {postagePayload?.data?.length} )
                  </span> */
}
