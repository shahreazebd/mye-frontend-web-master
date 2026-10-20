"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/helpers";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import useGetSearchParams from "@/hooks/custom/use-search-params";
import { useGetCarrierList } from "@/hooks/queries/new-carriers/use-get-carrier-list";
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
  isShowAll?: boolean;
  onValueChange?: (value: string) => void;
  filterFn?: (carrier: string) => boolean;
};

export function CarrierSelect({
  className,
  isShowAll = false,
  onValueChange,
  filterFn,
}: Readonly<Props>) {
  const searchParams = useGetSearchParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(searchParams?.carrier || "ALL");

  const { data: carrierList } = useGetCarrierList();
  const carrierTypes = [...new Set(carrierList?.map((e) => e.type))].filter((type) =>
    filterFn ? filterFn(type) : true
  );

  const carriers = isShowAll ? ["ALL", ...carrierTypes] : carrierTypes;

  const selectedValue = value;

  function handleChannelSelect(type: string) {
    const params = {
      ...searchParams,
      carrier: type,
    };

    const sp = new URLSearchParams(params)?.toString();

    onValueChange?.(type);

    router.push(`?${sp}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a carrier"
          className={cn("h-8 w-[200px] justify-between px-2 lg:px-3", className)}
        >
          <Avatar className="mr-2 size-5">
            <AvatarImage
              src={`/logos/carriers/round/${selectedValue?.toLowerCase()}.svg`}
              alt={selectedValue}
            />
            <AvatarFallback>{getInitials(selectedValue || "")}</AvatarFallback>
          </Avatar>
          <span className="capitalize">
            {selectedValue?.toLowerCase()?.replace("_", " ")}
          </span>
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-2">
        <Command>
          <CommandInput placeholder="Search carriers..." />
          <CommandList>
            <CommandEmpty>No carriers found.</CommandEmpty>

            {carriers.map((type, i) => (
              <CommandGroup key={i}>
                <CommandItem
                  key={i}
                  value={type}
                  onSelect={() => {
                    handleChannelSelect(type);
                    setValue(type);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 size-5">
                    <AvatarImage
                      src={`/logos/carriers/round/${type?.toLowerCase()}.svg`}
                      alt={type}
                    />
                    <AvatarFallback>{getInitials(type || "")}</AvatarFallback>
                  </Avatar>
                  <span className="capitalize">
                    {type?.toLowerCase()?.replace("_", " ")}
                  </span>
                  <CheckIcon
                    className={cn(
                      "ml-auto size-4",
                      value === type ? "opacity-100" : "opacity-0"
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
