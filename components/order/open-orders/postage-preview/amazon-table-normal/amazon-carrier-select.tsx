"use client";

import * as React from "react";
import { useSelectedCarrierKV } from "@/atoms/carriersAtom";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

import { EligibleShippingService } from "@/types/amazon-carriers-option";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  options: EligibleShippingService[];
  defaultValue?: string;
  value?: string;
  className?: string;
  orderId: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: EligibleShippingService) => void;
};

export function AmazonCarrierSelect(props: Readonly<Props>) {
  const { defaultValue, className, orderId } = props;
  const [open, setOpen] = React.useState(false);
  const { setSelectedCarrierKV, selectedCarrierKV } = useSelectedCarrierKV();

  const [value, setValue] = React.useState(defaultValue || "");

  const [carrierList] = React.useState(props?.options || []);

  const selected = carrierList.find(
    (carrier) => carrier?.ShippingServiceOfferId === value
  );

  React.useEffect(() => {
    setTimeout(() => {
      setValue(carrierList?.[0].ShippingServiceOfferId);
    }, 100);

    setSelectedCarrierKV((prev) => ({
      ...prev,
      [orderId]: carrierList[0],
    }));
  }, [orderId, carrierList]);

  React.useEffect(() => {
    if (JSON.stringify(selectedCarrierKV) === "{}") {
      setValue("");
    }
  }, [selectedCarrierKV]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a channel"
          className={cn("h-8 px-2")}
        >
          <span className="line-clamp-1 w-[200px] text-left">
            {selected?.ShippingServiceName || (
              <span className=" text-muted-foreground">Select a carrier</span>
            )}
          </span>
          <CaretSortIcon className="ml-auto w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("mr-8 w-auto p-1", className)}>
        <Command>
          <CommandInput placeholder="Search carrier..." />
          <CommandList>
            <ScrollArea className="">
              <CommandEmpty>No carrier found.</CommandEmpty>

              <CommandGroup>
                {carrierList
                  ?.sort((a, b) => a?.Rate?.Amount - b?.Rate?.Amount)
                  ?.map((carrier) => (
                    <CommandItem
                      key={carrier?.ShippingServiceOfferId}
                      value={carrier?.ShippingServiceName}
                      onSelect={() => {
                        setValue(carrier?.ShippingServiceOfferId);
                        setSelectedCarrierKV((prev) => ({
                          ...prev,
                          [orderId]: carrier,
                        }));

                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <div className="mr-2 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm">
                            {carrier?.ShippingServiceName} ( {carrier?.CarrierName}){" "}
                          </p>
                          {carrier?.Benefits?.IncludedBenefits?.includes(
                            "CLAIMS_PROTECTED"
                          ) && (
                            <Badge className="bg-teal-600  hover:bg-teal-600">
                              Claims Protected
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2  flex gap-4">
                          <p className="text-xs text-gray-500">
                            Estimated Delivery Date :{" "}
                            <span className="font-bold">
                              {dayjs(carrier?.ShipDate).format("ddd, MMM DD")}{" "}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            <span>Delivery Charge :</span>
                            <span className="font-bold">
                              {carrier?.Rate?.Amount} {carrier?.Rate?.CurrencyCode}
                            </span>
                          </p>
                        </div>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto size-4",
                          value === carrier?.ShippingServiceOfferId
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
