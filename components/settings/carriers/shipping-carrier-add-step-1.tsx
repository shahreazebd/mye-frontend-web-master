import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, SquareArrowOutUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { carrierData, type Carrier } from "./data";

interface Props {
  // eslint-disable-next-line no-unused-vars
  nextStep: (carrier: any) => void;
  setSelectedCarrierName: Dispatch<SetStateAction<string>>;
}

export function ShippingCarrierAddStep1({ nextStep, setSelectedCarrierName }: Props) {
  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(null);

  const selectedCarrier = carrierData.find(
    (carrier) => carrier.id.toString() === selectedCarrierId
  );

  useEffect(() => {
    setSelectedCarrierName(selectedCarrier?.type as string);
  }, [selectedCarrier, selectedCarrierId]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="step1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {carrierData.length === 0 ? (
          <div className="bg-muted/20 rounded-lg border py-8 text-center">
            <p className="text-muted-foreground">
              No marketplaces found matching your search.
            </p>
          </div>
        ) : (
          <div className="h-[290px] overflow-y-auto pr-1">
            <RadioGroup
              value={selectedCarrierId || ""}
              onValueChange={setSelectedCarrierId}
              className="gap-0"
            >
              {carrierData.map((carrier) => (
                <div key={carrier.id} className="relative">
                  <RadioGroupItem
                    value={carrier.id.toString()}
                    id={`channel-${carrier.id}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`channel-${carrier.id}`}
                    className={cn(
                      "hover:border-primary/70 peer-data-[state=checked]:bg-primary/5 flex cursor-pointer flex-col rounded-none border-b py-4 transition-all hover:shadow-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <Image
                        height={100}
                        width={100}
                        src={carrier.logo || "/placeholder.svg?height=36&width=36"}
                        alt={carrier.name}
                        className="h-10 w-20 object-contain"
                      />
                      <div>
                        <p className="text-sm font-medium">{carrier.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {carrier.description}
                        </p>
                        <Link
                          className="text-bg-primary mt-1.5 flex items-center gap-0.5 text-xs font-medium hover:text-blue-700"
                          target="_blank"
                          href={carrier.href}
                        >
                          Integration Guide
                          <SquareArrowOutUpRightIcon className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => nextStep(selectedCarrier as Carrier)}
            disabled={!selectedCarrierId}
            className={!selectedCarrierId ? "cursor-not-allowed opacity-50" : ""}
          >
            Continue <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
