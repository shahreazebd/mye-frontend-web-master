import { useState } from "react";
import { Check, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Carrier } from "./data";
import { ShippingCarrierAddStepOld1 } from "./shipping-carrier-add-step-old-1";
import { ShippingCarrierAddStepOld2 } from "./shipping-carrier-add-step-old-2";

export default function ShippingCarrierHeader() {
  const [selectedCarrierName, setSelectedCarrierName] = useState<string>("");
  const [step, setStep] = useState(1);
  const [carrier, setCarrier] = useState({} as Carrier);

  const nextStep = (carrier: Carrier) => {
    setStep((prev) => prev + 1);
    setCarrier(() => carrier);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="flex h-8 items-center gap-1"
          >
            <PlusCircle className="size-4" /> Add New Shipping Carrier
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px]">
          <div className="flex w-full border-b">
            <div
              className={cn(
                "flex flex-1 cursor-pointer items-center gap-3 px-6 py-4 transition-all",
                step === 1
                  ? "border-b-2 border-primary bg-background"
                  : "bg-muted/40 hover:bg-muted/60"
              )}
              {...(step === 2 && { onClick: () => prevStep() })}
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= 1 ? "bg-primary text-primary-foreground" : "border bg-muted"
                )}
              >
                {step > 1 ? <Check className="size-4" /> : "1"}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Choose Carrier</h3>
                <p className="text-xs text-muted-foreground">
                  Select a carrier to integrate
                </p>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-1 items-center gap-3 px-6 py-4 transition-all",
                step === 2 ? "border-b-2 border-primary bg-background" : "bg-muted/40"
              )}
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= 2 ? "bg-primary text-primary-foreground" : "border bg-muted"
                )}
              >
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold">
                  Connect {selectedCarrierName || "Carrier"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Configure integration settings
                </p>
              </div>
            </div>
          </div>
          {step === 1 ? (
            <ShippingCarrierAddStepOld1
              nextStep={nextStep}
              setSelectedCarrierName={setSelectedCarrierName}
            />
          ) : (
            <ShippingCarrierAddStepOld2 prevStep={prevStep} carrier={carrier} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
