"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/helpers";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import useGetSearchParams from "@/hooks/custom/use-search-params";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type Props = {
  className?: string;
};

const CARRIERS = [
  {
    name: "Amazon",
    value: "amazon",
  },
  {
    name: "Evri",
    value: "evri",
  },
  {
    name: "Click And Drop",
    value: "clickanddrop",
  },
  {
    name: "DHL",
    value: "dhl",
  },
  {
    name: "Fedex",
    value: "fedex",
  },
];

export default function CarrierSelect(props: Props) {
  const searchParams = useGetSearchParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(searchParams?.carrier || "evri");

  function handleChannelSelect(carrier: (typeof CARRIERS)[0]) {
    const params = {
      ...searchParams,
      carrier: carrier?.value,
    };

    const sp = new URLSearchParams(params)?.toString();

    router.push(`?${sp}`);
  }

  const selected = CARRIERS?.find((carrier) => carrier?.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a channel"
          className={cn("h-8 w-[200px] justify-between px-2 lg:px-3", props?.className)}
        >
          <Avatar className="mr-2 size-5">
            <AvatarImage
              src={`/logos/carriers/round/${selected?.value}.svg`}
              alt={selected?.name}
            />
            <AvatarFallback>{getInitials(selected?.name || "")}</AvatarFallback>
          </Avatar>
          <span>{selected?.name}</span>
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-2">
        <Command>
          <CommandInput placeholder="Search carriers..." />
          <CommandList>
            <CommandEmpty>No carriers found.</CommandEmpty>

            {CARRIERS?.map((carrier, i) => (
              <CommandGroup key={i}>
                <CommandItem
                  key={i}
                  value={carrier?.value}
                  onSelect={() => {
                    handleChannelSelect(carrier);
                    setValue(carrier?.value);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 size-5">
                    <AvatarImage
                      src={`/logos/carriers/round/${carrier?.value}.svg`}
                      alt={carrier?.name}
                      className="grayscale"
                    />
                    <AvatarFallback>{carrier?.name}</AvatarFallback>
                  </Avatar>
                  <span>{carrier?.name}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto size-4",
                      value === carrier?.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
