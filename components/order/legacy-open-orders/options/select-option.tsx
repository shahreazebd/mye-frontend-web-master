"use client";

import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  placeholder?: string;
  label?: string;
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  defaultOption?: string;
};

export default function SelectOption(props: Readonly<Props>) {
  const [value, setValue] = useState(props?.defaultOption);

  function onChangeHandler(value: string) {
    setValue(value);
    props?.onValueChange?.(value);
  }

  useEffect(() => {
    setValue(props?.defaultOption);
  }, [props?.defaultOption]);

  return (
    <section>
      {props?.label && (
        <label className="mb-2 block text-sm font-medium text-gray-600">
          {props?.label}
        </label>
      )}
      <Select onValueChange={onChangeHandler} value={value}>
        <SelectTrigger className={props?.className}>
          <SelectValue placeholder={props?.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <ScrollArea className="max-h-72">
              {props?.options?.map((option) => (
                <SelectItem key={option?.value} value={option?.value}>
                  {option?.label}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}
