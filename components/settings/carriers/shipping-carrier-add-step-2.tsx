import { motion } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";

import { AmazonShippingForm } from "./amazon-shipping-form";
import { ClickAndDropShippingForm } from "./click-and-drop-shipping-form";
import type { Carrier } from "./data";
import { DhlShippingForm } from "./dhl-shipping-form";
import { EvriShippingForm } from "./evri-shipping-form";
import { FedexShippingForm } from "./fedex-shipping-form";
import { IntegrateForm } from "./integrate-form";

interface Props {
  carrier: Carrier;
  prevStep: () => void;
}

export function ShippingCarrierAddStep2({ carrier, prevStep }: Props) {
  let render = <></>;

  switch (carrier.type) {
    case "AMAZON":
      render = <AmazonShippingForm />;
      break;
    case "FEDEX":
      render = <FedexShippingForm />;
      break;
    case "DHL":
      render = <DhlShippingForm />;
      break;
    case "ROYAL_MAIL":
      render = <ClickAndDropShippingForm />;
      break;
    case "EVRI":
      render = <EvriShippingForm />;
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
