import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import ChannelAddStep1, { Channel } from "./channel-add-step-1";
import ChannelAddStep2 from "./channel-add-step-2";
import { WalmartForm } from "./walmart-form";

export default function AllChannelHeader() {
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState({} as Channel);

  const nextStep = (channel: Channel) => {
    setStep((prev) => prev + 1);
    setChannel(() => channel);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-8 bg-white px-2 lg:px-3">
            <PlusCircle className="mr-2 size-4" />
            Add New Channel
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[540px] overflow-hidden">
          {step === 1 ? (
            <ChannelAddStep1 step={step} nextStep={nextStep} />
          ) : channel.name === "Walmart" ? (
            <WalmartForm step={step} prevStep={prevStep} channel={channel} />
          ) : (
            <ChannelAddStep2 step={step} prevStep={prevStep} channel={channel} />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
