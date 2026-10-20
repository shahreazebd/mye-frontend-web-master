"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Data = {
  label: string;
  value: string;
};

type Props = {
  field: ControllerRenderProps<any, any>;
  data: Data[];
  name: string;
  form: UseFormReturn<any, any, undefined>;
};

export default function FormSelect({ field, data = [], form, name }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? data.find((d) => d?.value === field.value)?.label : "Select"}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data.map((d) => (
              <CommandItem
                value={d.label}
                key={d.value}
                onSelect={() => {
                  form.setValue(name, d.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 size-4",
                    d.value === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {d.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
