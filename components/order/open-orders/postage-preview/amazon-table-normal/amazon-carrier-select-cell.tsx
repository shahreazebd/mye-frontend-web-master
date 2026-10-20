"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { AmazonBulkRate, Rate } from "@/hooks/queries/shipments/fetchAmazonBulkRates";
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
import { Spinner } from "@/components/ui/spinner";

export function AmazonRateSelectCell({ rowId }: Readonly<{ rowId: string }>) {
  const { amazonRateOptions, amazonSingleRate } = useAmazonRateOptions();
  const { amazonSelectedRates, setAmazonSelectedRates } = useAmazonSelectedRates();

  const searchParams = useSearchParams();

  const channelId = searchParams.get("channelId") as string;

  const { data: channelDetails } = useGetChannelDetails(channelId);

  const defaultCarrier = channelDetails?.default_carrier;

  const [open, setOpen] = useState(false);

  const selected = amazonSelectedRates[rowId];
  const [value, setValue] = useState<string | null>(selected?.rateId || null);

  const [orderCarrierOptions, setOrderCarrierOptions] = useState<AmazonBulkRate | null>(
    null
  );

  const carrierList = orderCarrierOptions?.rates?.rates ?? [];

  useEffect(() => {
    if (amazonRateOptions?.[rowId]) {
      const amazonRateOptionsData = amazonRateOptions?.[rowId];

      setOrderCarrierOptions(amazonRateOptionsData);
    }
  }, [amazonRateOptions, rowId]);

  useEffect(() => {
    if (amazonSingleRate.isLoading && amazonSingleRate.orderId === rowId) return;

    if (carrierList.length > 0 && !selected) {
      const matchingCarrier = carrierList.find(
        (carrier) =>
          defaultCarrier &&
          carrier.carrierId.toLowerCase().includes(defaultCarrier.toLowerCase())
      );

      rateSelectHandler(matchingCarrier || carrierList[0]);
    }
  }, [carrierList, selected, defaultCarrier, amazonSingleRate.isLoading, rowId]);

  useEffect(() => {
    setValue(selected?.rateId || null);
  }, [selected]);

  if (!orderCarrierOptions) {
    return <p className="text-xs text-muted-foreground">No carriers available</p>;
  }

  function rateSelectHandler(carrier: Rate) {
    setOpen(false);

    setAmazonSelectedRates((prev) => ({
      ...prev,
      [rowId]: carrier,
    }));
  }

  if (amazonSingleRate.isLoading && rowId === amazonSingleRate.orderId) {
    return <Spinner />;
  }

  if (carrierList.length === 0) {
    return <p className="text-sm text-muted-foreground">No carriers available</p>;
  }

  return (
    <section>
      {selected && (
        <section className="m-1">
          <p className="text-base font-bold text-green-600">{selected?.serviceName}</p>
          <p className="text-xs">
            Deliver On:{" "}
            {dayjs(selected.promise?.deliveryWindow?.start).format("ddd, MMM DD")}
          </p>

          <div>
            {selected?.benefits?.includedBenefits?.includes("CLAIMS_PROTECTED") && (
              <Badge className="bg-teal-600 hover:bg-teal-600">
                <Shield size={16} className="mr-1" /> Claims Protected
              </Badge>
            )}
          </div>
        </section>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a carrier"
            className="mt-1 h-8 w-[200px] justify-between px-2"
          >
            <span className="line-clamp-1 text-left">
              {selected?.serviceName || (
                <span className="text-muted-foreground">Select a carrier</span>
              )}
            </span>
            <CaretSortIcon className="ml-2 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[420px] p-1">
          <Command>
            <CommandInput placeholder="Search carrier..." />
            <CommandList>
              <ScrollArea className="max-h-72">
                <CommandEmpty>No carrier found.</CommandEmpty>
                <CommandGroup>
                  {carrierList
                    .sort((a, b) => a.totalCharge.value - b.totalCharge.value)
                    .map((carrier) => (
                      <CommandItem
                        key={carrier.rateId}
                        value={carrier.serviceName}
                        onSelect={() => rateSelectHandler(carrier)}
                        className="text-sm"
                      >
                        <div className="mr-2 w-full">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm">
                              {carrier.serviceName} ({carrier.carrierName})
                            </p>
                            {carrier?.benefits?.includedBenefits?.includes(
                              "CLAIMS_PROTECTED"
                            ) && (
                              <Badge className="bg-teal-600 hover:bg-teal-600">
                                Claims Protected
                              </Badge>
                            )}
                          </div>

                          <div className="mt-2 flex gap-4">
                            <p className="text-xs text-gray-500">
                              Estimated Delivery:{" "}
                              <span className="font-bold">
                                {dayjs(carrier.promise.deliveryWindow.start).format(
                                  "ddd, MMM DD"
                                )}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              <span>Charge: </span>
                              <span className="font-bold">
                                £{carrier.totalCharge.value} {carrier.totalCharge.unit}
                              </span>
                            </p>
                          </div>
                        </div>

                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            value === carrier.rateId ? "opacity-100" : "opacity-0"
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
    </section>
  );
}
