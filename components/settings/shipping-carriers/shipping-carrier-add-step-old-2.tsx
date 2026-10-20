import { motion } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AmazonShippingForm } from "@/components/settings/carriers/amazon-shipping-form";
import { DhlShippingForm } from "@/components/settings/carriers/dhl-shipping-form";
import { FedexShippingForm } from "@/components/settings/carriers/fedex-shipping-form";

import { ClickAndDropFormOld } from "./click-and-drop-form-old";
import type { Carrier } from "./data";
import { EvriFormOld } from "./evri-form-old";
import { IntegrateForm } from "./integrate-form";

interface Props {
  carrier: Carrier;
  prevStep: () => void;
}

export function ShippingCarrierAddStepOld2({ carrier, prevStep }: Props) {
  let render = <></>;

  switch (carrier.name) {
    case "AMAZON":
      render = <AmazonShippingForm />;
      break;
    case "FEDEX":
      render = <FedexShippingForm />;
      break;
    case "DHL":
      render = <DhlShippingForm />;
      break;
    case "Click and drop":
      render = <ClickAndDropFormOld prevStep={prevStep} />;
      break;
    case "EVRI":
      render = <EvriFormOld prevStep={prevStep} />;
      break;
    default:
      render = <IntegrateForm prevStep={prevStep} carrier={carrier} />;
      break;
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <ScrollArea className="h-[330px] pr-2 pt-2">{render}</ScrollArea>
    </motion.div>
  );
}
