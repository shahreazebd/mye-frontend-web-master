"use client";

import * as React from "react";
import countries from "@/utils/countries";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

interface CountrySelectData {
  label: string;
  data: SingleData[];
}

interface SingleData {
  label: string;
  value: string;
}

type Props = {
  defaultValue?: string;
  value?: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
};

export default function CountrySelect(props: Readonly<Props>) {
  let { defaultValue, onChange, className } = props;
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(defaultValue || props.value || "");

  const [allCountries, setAllCountries] = React.useState<CountrySelectData>();

  React.useEffect(() => {
    if (countries) {
      setAllCountries(() => {
        return {
          label: "Countries",
          data: [
            ...countries.map((data) => ({
              label: data,
              value: data,
            })),
          ],
        };
      });
    }
  }, [countries]);

  const selected = allCountries?.data?.find((channel) => channel.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a channel"
          className={cn("flex w-full justify-between px-2 lg:px-3")}
        >
          {selected?.label || (
            <span className=" text-muted-foreground">Select Country</span>
          )}
          <CaretSortIcon className="ml-auto w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={`w-[280px] p-2 ${className}`}>
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No Countries found.</CommandEmpty>

              <CommandGroup className="mr-3 mt-2">
                {allCountries?.data?.map((channel) => (
                  <CommandItem
                    key={channel.value}
                    value={channel.value}
                    onSelect={() => {
                      setValue(channel.value);
                      onChange?.(channel.value);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {channel.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4",
                        value === channel.value ? "opacity-100" : "opacity-0"
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
